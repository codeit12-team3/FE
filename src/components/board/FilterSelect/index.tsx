export default function FilterSelect({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <select
        className="
          appearance-none
          bg-bg-disabled text-text-disabled
          p-2 rounded-lg text-sm 
          border border-border pr-8 w-23
        "
      >
        <option>{placeholder}</option>
      </select>

      <span
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          text-text-disabled text-[12px] pointer-events-none
        "
      >
        ▼
      </span>
    </div>
  )
}
