import FormTextarea from '@/components/form/FormTextarea'

export default function BioField() {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <FormTextarea
        label="자기소개"
        name="introduction"
        placeholder="자기소개를 입력해주세요"
        className="resize-none min-h-30"
      />
    </div>
  )
}
