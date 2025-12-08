import AnimateFieldset from '@/components/auth/AnimateFieldset'
import FormInput from '@/components/auth/FormInput'

export default function PasswordFieldset() {
  return (
    <AnimateFieldset>
      <legend className="sr-only">비밀번호 입력 및 확인</legend>
      <FormInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="new-password"
      />
      <FormInput
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="new-password"
      />
    </AnimateFieldset>
  )
}
