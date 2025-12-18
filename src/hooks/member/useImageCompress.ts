import imageCompression, { Options } from 'browser-image-compression'
import { useState } from 'react'

type PresetType = 'profile' | 'post'

const COMPRESSION_PRESETS: Record<PresetType, Options> = {
  profile: {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 512,
    useWebWorker: true,
    initialQuality: 0.85,
  },
  post: {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.9,
  },
}

interface CompressResult {
  file: File
  previewUrl: string
  originalSize: number
  compressedSize: number
  ratio: number
}

interface UseImageCompressReturn {
  compress: (file: File) => Promise<CompressResult>
  isCompressing: boolean
  previewUrl: string | null
  reset: () => void
  error: string | null
}

export default function useImageCompress(
  preset: PresetType = 'profile',
  customOptions?: Partial<Options>,
): UseImageCompressReturn {
  const [isCompressing, setIsCompressing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const compress = async (file: File): Promise<CompressResult> => {
    if (!file.type.startsWith('image/')) {
      const msg = '이미지 파일만 압축할 수 있습니다.'
      setError(msg)
      throw new Error(msg)
    }

    setIsCompressing(true)
    setError(null)

    try {
      const options: Options = {
        ...COMPRESSION_PRESETS[preset],
        ...customOptions,
      }

      const compressedFile = await imageCompression(file, options)

      const preview = URL.createObjectURL(compressedFile)
      setPreviewUrl(preview)

      const result: CompressResult = {
        file: compressedFile,
        previewUrl: preview,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        ratio: Number(((1 - compressedFile.size / file.size) * 100).toFixed(1)),
      }

      return result
    } catch (err) {
      const msg = err instanceof Error ? err.message : '이미지 압축 실패'
      setError(msg)
      throw err
    } finally {
      setIsCompressing(false)
    }
  }

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setError(null)
  }

  return { compress, isCompressing, previewUrl, reset, error }
}
