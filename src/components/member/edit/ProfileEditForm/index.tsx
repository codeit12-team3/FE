import BasicInfo from '../BasicInfo'
import BioField from '../BioField'
import BirthdayAndMbti from '../BirthdayAndMbti'
import EmailField from '../EmailField'
import FormActionBtn from '../FormActionBtn'
import GenderField from '../GenderField'
import PreferenceInfo from '../PreferenceInfo'

export default function ProfileEditForm() {
  return (
    <form action="" className="w-inherit">
      <EmailField />
      <BasicInfo />
      <GenderField />
      <BirthdayAndMbti />
      <PreferenceInfo />
      <BioField />
      <FormActionBtn />
    </form>
  )
}
