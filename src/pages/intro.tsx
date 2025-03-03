import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Intro.module.css";

export default function Intro() {
  return (
    <PageWrapper title="系统介绍">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>欢迎使用 YierQuestionnaire</h1>
          <p className={styles.text}>智能问卷系统 - 让调研更简单，分析更智能</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>关于系统</h2>
          <p className={styles.text}>
            YierQuestionnaire 是一个现代化的问卷调查系统，由
            <span className={styles.highlightText}> coderYier </span>
            开发。系统采用直观的界面设计，让创建和填写问卷变得简单高效。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>技术特色</h2>
          <p className={styles.text}>
            我们即将接入
            <span className={styles.highlightText}> deepseek R1 </span>
            大模型，这将为问卷分析带来革命性的突破：
          </p>
          <p className={styles.text}>• 智能数据分析</p>
          <p className={styles.text}>• 自动生成分析报告</p>
          <p className={styles.text}>• 深度洞察用户反馈</p>
          <p className={styles.text}>• 个性化建议生成</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>未来展望</h2>
          <p className={styles.text}>
            我们将持续优化系统功能，提供更智能的问卷分析服务。通过AI技术的加持，
            为用户提供更有价值的数据洞察。
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
