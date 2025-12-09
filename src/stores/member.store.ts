import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { MemberEditState, MemberState } from '@/types/member'

export const useUploadingImageStore = create<MemberEditState>((set) => ({
  isUploadingImage: false,

  setIsUploadingImage: (uploading) => set({ isUploadingImage: uploading }),
  reset: () => set({ isUploadingImage: false }),
}))

export const useMemberStore = create<MemberState>()(
  devtools(
    (set, get) => ({
      profile: null,
      isDirty: false,
      isSubmitting: false,

      setProfile: (profile) => set({ profile, isDirty: false }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
          isDirty: true,
        })),

      setImage: (image) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, image } : null,
          isDirty: true,
        })),

      setBirth: (birth: string) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, birth } : null,
          isDirty: true,
        }))
      },

      getBirthDate: () => {
        const birth = get().profile?.birth
        if (!birth || birth === '') {
          return { year: 0, month: 0, day: 0 }
        }
        const [y, m, d] = birth.split('-').map(Number)
        return { year: y || 0, month: m || 0, day: d || 0 }
      },

      setDirty: (dirty) => set({ isDirty: dirty }),
      setSubmitting: (submitting) => set({ isSubmitting: submitting }),

      getUpdatePayload: () => {
        const profile = get().profile
        if (!profile) throw new Error('Profile not loaded')

        return {
          image: profile.image,
          nickname: profile.nickname || undefined,
          name: profile.name || undefined,
          birth: profile.birth || undefined,
          gender: profile.gender || undefined,
          mbti: profile.mbti,
          accommodation: profile.accommodation,
          travelStyle: profile.travelStyle,
          bio: profile.bio,
        }
      },

      reset: () => set({ profile: null, isDirty: false, isSubmitting: false }),
    }),
    { name: 'MemberStore' },
  ),
)
