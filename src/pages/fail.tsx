import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import styles from "@/styles/Result.module.css";

export default function Fail() {
  const router = useRouter();

  return (
    <PageWrapper title="提交失败">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.styledWrapper}>
            <div className={styles.failIcon} />
            <h1 className={styles.title}>问卷提交失败</h1>
            <p className={styles.subTitle}>
              抱歉，提交过程中出现了问题，请稍后重试
            </p>
            <button className={styles.button} onClick={() => router.back()}>
              返回重试
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          Powered by YierQuestionnaire © {new Date().getFullYear()}
        </div>
      </div>
    </PageWrapper>
  );
}
