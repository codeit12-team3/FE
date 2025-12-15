interface RowProps {
  label: string
  children: React.ReactNode
}

const LABEL_STYLE = 'text-text-disabled w-20'
const VALUE_STYLE = 'text-text-base'
const ROW_STYLE = 'flex gap-3'

export default function PostWriterRow({ label, children }: RowProps) {
  return (
    <div className={ROW_STYLE}>
      <span className={LABEL_STYLE}>{label}</span>
      <span className={VALUE_STYLE}>{children}</span>
    </div>
  )
}
