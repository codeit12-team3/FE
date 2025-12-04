export default function GenderField() {
  return (
    <div>
      <label className="block font-medium ">
        성별 <span className="text-danger">*</span>
      </label>
      <div className="mt-3 flex gap-5 h-11">
        <label className="flex items-center gap-3">
          <span>남</span>
          <input
            type="radio"
            name="gender"
            value="male"
            required
            className="w-6 h-6"
          />
        </label>
        <label className="flex items-center gap-3">
          <span>여</span>
          <input
            type="radio"
            name="gender"
            value="female"
            className="w-6 h-6"
          />
        </label>
      </div>
    </div>
  )
}
