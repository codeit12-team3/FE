import BasicInfo from '../BasicInfo/BasicInfo'
import BioField from '../BioField/BioField'
import BirthdayAndMbti from '../BirthdayAndMbti/BirthdayAndMbti'
import FormActionBtn from '../FormActionBtn/FormActionBtn'
import GenderField from '../GenderField/GenderField'
import PreferenceInfo from '../PreferenceInfo/PreferenceInfo'

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
