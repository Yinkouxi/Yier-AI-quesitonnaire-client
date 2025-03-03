import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import styles from "@/styles/Result.module.css";

export default function Success() {
  const router = useRouter();

  return (
    <PageWrapper title="提交成功">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.styledWrapper}>
            <div className={styles.successIcon} />
            <h1 className={styles.title}>问卷提交成功</h1>
            <p className={styles.subTitle}>
              感谢您的参与，您的反馈对我们很重要
            </p>
            <button
              className={styles.button}
              onClick={() => router.push("/intro")}
            >
              了解更多
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
