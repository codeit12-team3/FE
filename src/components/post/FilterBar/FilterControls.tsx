import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_ENUM_OPTIONS,
} from '@/constants/posts'
import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

import FilterDate from './FilterDate'
import FilterSelect from './FilterSelect'

interface FilterControlsProps {
  filters: Omit<PostFilterParams, 'keyword'>
  onApply: (next: Partial<Omit<PostFilterParams, 'keyword'>>) => void
}

export default function FilterControls({
  filters,
  onApply,
}: FilterControlsProps) {
  const TRIGGER = 'w-22 text-sm text-gray-800 font-medium cursor-pointer'

  return (
    <>
      <FilterSelect
        value={filters.nation}
        options={NATION_ENUM_OPTIONS}
        placeholder="국가"
        onChange={(value) =>
          onApply({
            nation: value === 'ALL' ? '' : value,
          })
        }
        className={TRIGGER}
      />

      <FilterSelect
        value={filters.ageType}
        options={AGE_OPTIONS}
        placeholder="나이"
        onChange={(value) =>
          onApply({
            ageType: value === 'ALL' ? undefined : (value as AgeType),
          })
        }
        className={TRIGGER}
      />

      <FilterSelect
        value={filters.gender}
        options={GENDER_OPTIONS}
        placeholder="성별"
        onChange={(value) =>
          onApply({
            gender: value === 'ALL' ? undefined : (value as GenderType),
          })
        }
        className={TRIGGER}
        includeAllOption={false}
      />

      <FilterDate
        date={filters.date}
        onApply={(date) => onApply({ date })}
        triggerClassName="w-auto min-w-22 text-sm text-gray-800 font-medium cursor-pointer"
      />
    </>
  )
}
