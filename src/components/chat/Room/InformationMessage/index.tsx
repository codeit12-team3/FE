export default function InformationMessage({
  InformationText,
}: {
  InformationText: string
}) {
  return (
    <div className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-500 rounded-full mx-auto">
      {InformationText}
    </div>
  )
}
