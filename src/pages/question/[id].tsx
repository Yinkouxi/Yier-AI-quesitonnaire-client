import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";
import styles from "@/pages/question/Question.module.css";

type PropsType = {
  errno: number;
  data?: {
    _id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

export default function Question(props: PropsType) {
  const { errno, data, msg = "" } = props;

  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.errorContainer}>
              <h1>错误</h1>
              <p>{msg}</p>
            </div>
          </div>
          <div className={styles.footer}>
            Powered by YierQuestionnaire © {new Date().getFullYear()}
          </div>
        </div>
      </PageWrapper>
    );
  }

  const {
    _id: id,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {};

  // 已经被删除的，提示错误
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.errorContainer}>
              <h1>{title}</h1>
              <p>该问卷已经被删除</p>
            </div>
          </div>
          <div className={styles.footer}>
            Powered by YierQuestionnaire © {new Date().getFullYear()}
          </div>
        </div>
      </PageWrapper>
    );
  }

  // 尚未发布的，提示错误
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.errorContainer}>
              <h1>{title}</h1>
              <p>该问卷尚未发布</p>
            </div>
          </div>
          <div className={styles.footer}>
            Powered by YierQuestionnaire © {new Date().getFullYear()}
          </div>
        </div>
      </PageWrapper>
    );
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map((c) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <PageWrapper title={title} desc={desc}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.questionnaireCard}>
            <form method="post" action="/api/answer">
              <input type="hidden" name="questionId" value={id} />
              {ComponentListElem}
              <button type="submit" className={styles.submitButton}>
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
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;

  // 根据 id 获取问卷数据
  const data = await getQuestionById(id);
  console.log(data, "ques data");

  return {
    props: data,
  };
}
