import { Button } from '@/components/ui'

interface ApplyModalContentProps {
  message: string
  onChangeMessage: (v: string) => void
  onSubmit: () => void
}

export default function ApplyModal({
  message,
  onChangeMessage,
  onSubmit,
}: ApplyModalContentProps) {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        동행 신청 메시지
      </h2>

      <textarea
        value={message}
        onChange={(e) => onChangeMessage(e.target.value)}
        className="w-full border border-gray-500 rounded-lg p-3 mb-2 text-sm focus:outline-none   resize-none"
        placeholder="신청 메시지를 입력해주세요"
        rows={4}
      />

      <Button onClick={onSubmit} className="w-full">
        신청하기
      </Button>
    </>
  )
}
