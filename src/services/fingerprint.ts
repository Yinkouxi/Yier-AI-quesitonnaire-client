import FingerprintJS from '@fingerprintjs/fingerprintjs'

// 初始化浏览器指纹
let fingerprint: string | null = null

export const getFingerprint = async (): Promise<string> => {
  if (fingerprint) return fingerprint

  try {
    // 正确使用新版API
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    fingerprint = result.visitorId
    return fingerprint
  } catch (error) {
    console.error('获取浏览器指纹失败:', error)
    // 如果获取指纹失败，返回一个随机字符串作为备用方案
    const fallbackId = `fallback-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`
    fingerprint = fallbackId
    return fallbackId
  }
}

// 检查用户是否已提交过特定问卷
export const hasSubmittedQuestionnaire = (questionId: string): boolean => {
  if (typeof window === 'undefined') return false

  const submittedQuestionnaires = localStorage.getItem(
    'submittedQuestionnaires'
  )
  if (!submittedQuestionnaires) return false

  try {
    const questionnaires = JSON.parse(submittedQuestionnaires)
    return questionnaires.includes(questionId)
  } catch (e) {
    return false
  }
}

// 标记问卷为已提交
export const markQuestionnaireAsSubmitted = (questionId: string): void => {
  if (typeof window === 'undefined') return

  const submittedQuestionnaires = localStorage.getItem(
    'submittedQuestionnaires'
  )
  let questionnaires = []

  if (submittedQuestionnaires) {
    try {
      questionnaires = JSON.parse(submittedQuestionnaires)
    } catch (e) {
      questionnaires = []
    }
  }

  if (!questionnaires.includes(questionId)) {
    questionnaires.push(questionId)
    localStorage.setItem(
      'submittedQuestionnaires',
      JSON.stringify(questionnaires)
    )
  }
}
