import PageWrapper from '@/components/PageWrapper'
import { useRouter } from 'next/router'
import styles from '@/styles/Result.module.css'

export default function DuplicateSubmission() {
  const router = useRouter()
  const { title = '问卷', id = '' } = router.query

  return (
    <PageWrapper title={`${title} - 已提交`}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.styledWrapper}>
            <div className={styles.infoIcon} /> {/* 需要添加对应的样式 */}
            <h1 className={styles.title}>您已经提交过此问卷</h1>
            <p className={styles.subTitle}>
              同一用户不能重复提交问卷，感谢您的参与
            </p>
            <button
              className={styles.button}
              onClick={() => router.push('/intro')}
            >
              返回首页
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          Powered by YierQuestionnaire © {new Date().getFullYear()}
        </div>
      </div>
    </PageWrapper>
  )
}
