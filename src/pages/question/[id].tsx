import PageWrapper from '@/components/PageWrapper'
import { getQuestionById } from '@/services/question'
import { getComponent } from '@/components/QuestionComponents'
import styles from '@/pages/question/Question.module.css'
import { postAnswer } from '@/services/answer'
import {
  hasSubmittedQuestionnaire,
  markQuestionnaireAsSubmitted,
} from '@/services/fingerprint'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type PropsType = {
  errno: number
  data?: {
    _id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished: boolean
    isDeleted: boolean
    componentList: Array<any>
  }
  msg?: string
}

export default function Question(props: PropsType) {
  const { errno, data, msg = '' } = props
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()

  // 关键: 等待路由准备好才执行跳转
  const isRouterReady = router.isReady

  useEffect(() => {
    // 只在客户端且路由准备好后执行
    if (typeof window !== 'undefined' && isRouterReady) {
      // 检查用户是否已提交过该问卷
      if (data && data._id) {
        const hasSubmitted = hasSubmittedQuestionnaire(data._id)
        setIsSubmitted(hasSubmitted)

        // 如果已提交，重定向到专门的提示页面
        if (hasSubmitted) {
          router.push({
            pathname: '/duplicate-submission',
            query: { title: data.title, id: data._id },
          })
        }
      }

      // 数据错误时，重定向到错误页面
      if (errno !== 0) {
        router.push({
          pathname: '/error',
          query: {
            title: '访问错误',
            message: msg || '抱歉，您访问的问卷不存在或已被移除',
          },
        })
      }
    }
  }, [data, router, errno, msg, isRouterReady]) // 添加isRouterReady作为依赖

  // 对于已删除和未发布的问卷，也需要同样处理
  useEffect(() => {
    if (typeof window !== 'undefined' && isRouterReady && data) {
      // 已经被删除的，提示错误
      if (data.isDeleted) {
        router.push({
          pathname: '/error',
          query: {
            title: data.title || '问卷已删除',
            message: '该问卷已经被删除',
          },
        })
      }

      // 尚未发布的，提示错误
      if (!data.isPublished) {
        router.push({
          pathname: '/error',
          query: {
            title: data.title || '问卷未发布',
            message: '该问卷尚未发布',
          },
        })
      }
    }
  }, [data, router, isRouterReady])

  // 如果数据错误、问卷已删除或未发布，显示加载状态而不是立即返回null
  if (errno !== 0 || (data && (data.isDeleted || !data.isPublished))) {
    return (
      <PageWrapper title='加载中'>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.loadingContainer}>
              <p>页面加载中...</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const {
    _id: id,
    title = '',
    desc = '',
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {}

  console.log(data, 'data')

  // 处理表单提交
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answerData: any = {
      questionId: id,
      answerList: [],
    }

    componentList.forEach((component) => {
      const componentId = component.fe_id
      const value = formData.getAll(componentId)
      answerData.answerList.push({
        componentFeId: componentId,
        value: value.length === 1 ? value[0] : value,
      })
    })

    try {
      console.log('准备提交答卷数据:', answerData)
      const res = await postAnswer(answerData)
      console.log('提交答卷响应:', res)

      if (res.errno === 0) {
        markQuestionnaireAsSubmitted(id)
        // 成功提交后跳转到成功页面
        router.push('/success')
      } else {
        // 提交失败，但是由于已被提交的情况
        if (res.msg && res.msg.includes('提交过') && res.errno === -1) {
          markQuestionnaireAsSubmitted(id)
          router.push({
            pathname: '/duplicate-submission',
            query: { title: title, id: id },
          })
        } else {
          // 其他失败情况
          router.push('/fail')
        }
      }
    } catch (error) {
      console.error('提交答卷出错:', error)
      router.push('/fail')
    }
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map((c) => {
        const ComponentElem = getComponent(c)
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        )
      })}
    </>
  )

  return (
    <PageWrapper title={title} desc={desc}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.questionnaireCard}>
            {submitError && (
              <div className={styles.errorMessage}>{submitError}</div>
            )}
            <form method='post' onSubmit={handleSubmit}>
              <input type='hidden' name='questionId' value={id} />
              {ComponentListElem}
              <button type='submit' className={styles.submitButton}>
                提交问卷
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footer}>
          Powered by YierQuestionnaire © {new Date().getFullYear()}
        </div>
      </div>
    </PageWrapper>
  )
}

export async function getServerSideProps(context: any) {
  const { id = '' } = context.params

  // 根据 id 获取问卷数据
  const data = await getQuestionById(id)
  console.log(data, 'ques data')

  return {
    props: data,
  }
}
