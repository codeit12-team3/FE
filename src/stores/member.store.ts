import { create } from 'zustand'

interface MemberEditState {
  uploadedImageUrl: string | null
  isUploadingImage: boolean

  setUploadedImageUrl: (url: string | null) => void
  setIsUploadingImage: (uploading: boolean) => void
  reset: () => void
}

export const MemberEditState = create<MemberEditState>((set) => ({
  uploadedImageUrl: null,
  isUploadingImage: false,

  setUploadedImageUrl: (url) => set({ uploadedImageUrl: url }),
  setIsUploadingImage: (uploading) => set({ isUploadingImage: uploading }),
  reset: () => set({ uploadedImageUrl: null, isUploadingImage: false }),
}))
