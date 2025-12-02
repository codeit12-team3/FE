'use client'

export default function TravelPostForm() {
  return (
    <div className="space-y-2.5">
      <div>
        <label className="block text-sm text-text-base mb-2">
          모임 이름 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="모임 이름을 작성해주세요"
          className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          여행 테마 <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="태그로 선택해주세요, 최대 5개"
          className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">이미지</label>
        <input
          type="text"
          placeholder="최대 3장, 5MB 제한"
          className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          국가 <span className="text-danger">*</span>
        </label>
        <select className="w-full px-4 py-3 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] ring-0 outline-none">
          <option>국가를 선택해주세요</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          모집 정원 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="인원을 입력해주세요"
            className="w-1/2 px-4 py-3 rounded-lg text-sm placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
          />

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">남성만</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">여성만</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-main" />
            <span className="text-sm text-text-base">모두</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          나이 <span className="text-danger">*</span>
        </label>

        <div className="flex gap-3 items-center">
          <select className="flex-1 px-4 py-3 rounded-lg text-sm text-text-input appearance-none bg-[#EDF4FB] ring-0 outline-none">
            <option>출생년도 선택해주세요</option>
          </select>

          <label className="flex items-center gap-2">
            <input type="radio" name="age" className="accent-main" />
            <span className="text-sm text-text-base">이상</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="age" className="accent-main" />
            <span className="text-sm text-text-base">이하</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <label className="text-sm text-text-base mb-2">
            여행 시작 일시 <span className="text-danger">*</span>
          </label>
          <input
            type="datetime-local"
            className="px-4 py-3 rounded-lg text-sm text-text-base bg-[#EDF4FB] ring-0 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-text-base mb-2">
            여행 종료 일시 <span className="text-danger">*</span>
          </label>
          <input
            type="datetime-local"
            className="px-4 py-3 rounded-lg text-sm text-text-base bg-[#EDF4FB] ring-0 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-text-base mb-2">
          모집 설명 (0/500)
        </label>
        <textarea
          rows={4}
          placeholder="모집 설명을 입력해주세요"
          className="w-full px-4 py-3 rounded-lg text-sm resize-none placeholder:text-text-input bg-[#EDF4FB] ring-0 outline-none"
        />
      </div>

      <button className="w-full py-3 rounded-lg font-medium bg-bg-disabled text-text-disabled">
        게시하기
      </button>
    </div>
  )
}
