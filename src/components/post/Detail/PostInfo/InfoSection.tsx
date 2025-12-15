interface InfoSectionProps {
  title: string
  children: React.ReactNode
}

export const InfoSection = ({ title, children }: InfoSectionProps) => (
  <div>
    <h3 className="font-semibold mb-2 text-text-base text-lg">{title}</h3>
    {children}
  </div>
)
