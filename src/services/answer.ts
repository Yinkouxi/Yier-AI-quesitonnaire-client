import { post } from './ajax'
import { getFingerprint } from './fingerprint'

// 提交答卷
export async function postAnswer(answerInfo: any) {
  try {
    const fingerprint = await getFingerprint()
    const url = '/api/answer'
    const data = await post(url, {
      ...answerInfo,
      fingerprint,
    })
    return data
  } catch (error) {
    console.error('提交答卷失败:', error)
    return {
      errno: -1,
      msg: '提交失败，请稍后重试',
    }
  }
}
