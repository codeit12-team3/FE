import { FormInput } from '@/components/form'

export default function EmailField() {
  return <FormInput label="이메일" name="email" type="email" disabled={true} />
}
