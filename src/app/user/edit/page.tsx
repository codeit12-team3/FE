import ProfileEditForm from '../components/ProfileEditForm'
import ProfileImageEdit from '../components/ProfileImageEdit'

export default function page() {
  return (
    <div>
      <h1 className="font-semibold text-[32px]">내 프로필</h1>
      <div>
        <div className="flex justify-center mb-11.5">
          <ProfileImageEdit />
        </div>
      </div>

      <div className="flex justify-center">
        <ProfileEditForm />
      </div>
    </div>
  )
}
