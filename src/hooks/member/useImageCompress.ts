import imageCompression, { Options } from 'browser-image-compression'
import { useState } from 'react'

interface CompressResult {
  compressedFile: File
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

const defaultOptions: Options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 512,
  useWebWorker: true,
  fileType: 'image/webp',
  initialQuality: 0.85,
}

export default function useImageCompress(
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
      const options: Options = { ...defaultOptions, ...customOptions }

      const compressedFile = await imageCompression(file, options)

      const finalFile =
        compressedFile.type === 'image/webp' &&
        !compressedFile.name.endsWith('.webp')
          ? new File(
              [compressedFile],
              compressedFile.name.split('.').slice(0, -1).join('.') + '.webp',
              {
                type: 'image/webp',
              },
            )
          : compressedFile

      const preview = URL.createObjectURL(finalFile)
      setPreviewUrl(preview)

      const result: CompressResult = {
        compressedFile: finalFile,
        previewUrl: preview,
        originalSize: file.size,
        compressedSize: finalFile.size,
        ratio: Number(((1 - finalFile.size / file.size) * 100).toFixed(1)),
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
