import BasicInfo from './BasicInfo'
import BioField from './BioField'
import BirthdayAndMbti from './BirthdayAndMbti'
import FormActionBtn from './FormActionBtn'
import GenderField from './GenderField'
import PreferenceInfo from './PreferenceInfo'

export default function ProfileEditForm() {
  return (
    <form action="" className="w-138">
      <div className="flex gap-6">
        <BasicInfo />
        <GenderField />
      </div>
      <BirthdayAndMbti />
      <PreferenceInfo />
      <BioField />
      <FormActionBtn />
    </form>
  )
}
