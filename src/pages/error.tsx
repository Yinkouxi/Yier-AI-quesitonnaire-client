import PageWrapper from '@/components/PageWrapper'
import { useRouter } from 'next/router'
import styles from '@/styles/Result.module.css'
import { useEffect, useState } from 'react'

export default function Error() {
  const router = useRouter()
  const { title = '访问错误', message = '抱歉，您访问的问卷不存在或已被移除' } =
    router.query

  return (
    <PageWrapper title={String(title)}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.styledWrapper}>
            <div className={styles.failIcon} />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subTitle}>{message}</p>
            <button
              className={styles.button}
              onClick={() => (window.location.href = '/intro')}
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
