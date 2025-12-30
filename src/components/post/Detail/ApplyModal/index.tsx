import { Button } from '@/components/ui'

interface ApplyModalContentProps {
  message: string
  onChangeMessage: (v: string) => void
  onClose: () => void
  onSubmit: () => void
}

export default function ApplyModal({
  message,
  onChangeMessage,
  onClose,
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
        className="w-full border border-gray-500 rounded-lg p-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="신청 메시지를 입력해주세요"
        rows={4}
      />

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button onClick={onSubmit}>신청하기</Button>
      </div>
    </>
  )
}
