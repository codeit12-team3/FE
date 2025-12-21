import { screen, waitFor } from '@testing-library/react' // ✅ fireEvent 제거
import userEvent from '@testing-library/user-event'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadMemberImage } from '@/api/images/images.client'
import useImageCompress from '@/hooks/member/useImageCompress'
import { renderMember } from '@/tests/utils/member'

import ProfileImageEdit from './index'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-1234'),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    priority,
  }: {
    src: string
    alt: string
    priority?: boolean
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-priority={priority} />
  ),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@/api/images/images.client', () => ({
  uploadMemberImage: jest.fn(),
}))

jest.mock('@/hooks/member/useImageCompress', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: jest.fn(),
  useWatch: jest.fn(),
}))

jest.mock('@/lib/common', () => ({
  getImageUrl: jest.fn((url: string | null) => url || '/default-profile.png'),
}))

const mockSetValue = jest.fn()
const mockCompress = jest.fn()

const originalRevokeObjectURL = global.URL.revokeObjectURL
global.URL.revokeObjectURL = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(useFormContext as jest.Mock).mockReturnValue({
    setValue: mockSetValue,
    control: {},
  })
  ;(useWatch as jest.Mock).mockReturnValue('')
  ;(useImageCompress as jest.Mock).mockReturnValue({
    compress: mockCompress,
  })
})

afterAll(() => {
  global.URL.revokeObjectURL = originalRevokeObjectURL
})

describe('ProfileImageEdit 단위 테스트', () => {
  const renderProfileImageEdit = (options = {}) => {
    return renderMember(<ProfileImageEdit />, options)
  }

  describe('렌더링', () => {
    test('프로필 이미지와 편집 버튼이 렌더링된다', () => {
      renderProfileImageEdit()

      expect(screen.getByAltText('프로필 이미지')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    test('초기 이미지가 표시된다', () => {
      ;(useWatch as jest.Mock).mockReturnValue(
        'https://example.com/profile.jpg',
      )

      renderProfileImageEdit()

      const image = screen.getByAltText('프로필 이미지')
      expect(image).toHaveAttribute('src', 'https://example.com/profile.jpg')
    })

    test('이미지가 없으면 기본 이미지가 표시된다', () => {
      ;(useWatch as jest.Mock).mockReturnValue('')

      renderProfileImageEdit()

      const image = screen.getByAltText('프로필 이미지')
      expect(image).toHaveAttribute('src', '/default-profile.png')
    })
  })

  describe('파일 업로드', () => {
    test('올바른 이미지 파일 업로드 시 압축 및 업로드가 실행된다', async () => {
      const user = userEvent.setup()

      mockCompress.mockResolvedValue({
        file: new File(['compressed'], 'compressed.jpg', {
          type: 'image/jpeg',
        }),
        previewUrl: 'blob:preview-url',
      })
      ;(uploadMemberImage as jest.Mock).mockResolvedValue(
        'uploaded-image-path.jpg',
      )

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(mockCompress).toHaveBeenCalledWith(file)
        expect(uploadMemberImage).toHaveBeenCalledWith(
          expect.any(File),
          'JPEG',
          'MEMBER',
        )
        expect(mockSetValue).toHaveBeenCalledWith(
          'image',
          'uploaded-image-path.jpg',
          { shouldDirty: true },
        )
        expect(toast.success).toHaveBeenCalledWith(
          '프로필 사진이 변경되었습니다!',
          {
            duration: 2000,
          },
        )
      })
    })

    test('PNG 이미지 업로드가 정상 작동한다', async () => {
      const user = userEvent.setup()

      mockCompress.mockResolvedValue({
        file: new File(['compressed'], 'compressed.png', { type: 'image/png' }),
        previewUrl: 'blob:preview-url',
      })
      ;(uploadMemberImage as jest.Mock).mockResolvedValue('uploaded-image.png')

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.png', { type: 'image/png' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(uploadMemberImage).toHaveBeenCalledWith(
          expect.any(File),
          'PNG',
          'MEMBER',
        )
      })
    })

    test('WEBP 이미지 업로드가 정상 작동한다', async () => {
      const user = userEvent.setup()

      mockCompress.mockResolvedValue({
        file: new File(['compressed'], 'compressed.webp', {
          type: 'image/webp',
        }),
        previewUrl: 'blob:preview-url',
      })
      ;(uploadMemberImage as jest.Mock).mockResolvedValue('uploaded-image.webp')

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.webp', { type: 'image/webp' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(uploadMemberImage).toHaveBeenCalledWith(
          expect.any(File),
          'WEBP',
          'MEMBER',
        )
      })
    })
  })

  describe('로딩 상태', () => {
    test('업로드 중 로딩 스피너가 표시된다', async () => {
      const user = userEvent.setup()

      mockCompress.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  file: new File(['compressed'], 'compressed.jpg', {
                    type: 'image/jpeg',
                  }),
                  previewUrl: 'blob:preview-url',
                }),
              100,
            ),
          ),
      )
      ;(uploadMemberImage as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve('uploaded.jpg'), 100),
          ),
      )

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      expect(screen.getByRole('button')).toBeDisabled()

      await waitFor(() => {
        expect(screen.getByRole('button')).not.toBeDisabled()
      })
    })
  })

  describe('에러 처리', () => {
    test('압축 실패 시 에러 메시지를 표시한다', async () => {
      const user = userEvent.setup()
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      mockCompress.mockRejectedValue(new Error('Compression failed'))

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '이미지 업로드 중 오류가 발생했습니다',
        )
        expect(uploadMemberImage).not.toHaveBeenCalled()
        expect(mockSetValue).not.toHaveBeenCalled()
      })

      consoleErrorSpy.mockRestore()
    })

    test('업로드 실패 시 에러 메시지를 표시한다', async () => {
      const user = userEvent.setup()
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      mockCompress.mockResolvedValue({
        file: new File(['compressed'], 'compressed.jpg', {
          type: 'image/jpeg',
        }),
        previewUrl: 'blob:preview-url',
      })
      ;(uploadMemberImage as jest.Mock).mockRejectedValue(
        new Error('Upload failed'),
      )

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '이미지 업로드 중 오류가 발생했습니다',
        )
        expect(mockSetValue).not.toHaveBeenCalled()
      })

      consoleErrorSpy.mockRestore()
    })
  })

  describe('프리뷰 이미지', () => {
    test('업로드 중 프리뷰 이미지가 즉시 표시된다', async () => {
      const user = userEvent.setup()

      mockCompress.mockResolvedValue({
        file: new File(['compressed'], 'compressed.jpg', {
          type: 'image/jpeg',
        }),
        previewUrl: 'blob:preview-url',
      })
      ;(uploadMemberImage as jest.Mock).mockResolvedValue('uploaded.jpg')

      renderProfileImageEdit()

      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement
      const file = new File(['image'], 'profile.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      await waitFor(() => {
        const image = screen.getByAltText('프로필 이미지')
        expect(image).toHaveAttribute('src', 'blob:preview-url')
      })
    })
  })
})
