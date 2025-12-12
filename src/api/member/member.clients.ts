import { axios } from '../common'

/**
 * 닉네임 중복 확인 요청
 * @param 닉네임
 */
export const checkNickname = async (nickname: string) => {
  return await axios.post('/v1/member/nickname/check', {
    nickname,
  })
}
