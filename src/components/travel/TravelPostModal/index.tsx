'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

import TravelPostForm from '../TravelPostForm'

interface TravelPostModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TravelPostModal({
  isOpen,
  onClose,
}: TravelPostModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[520px] p-6 relative h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <h2 className="text-lg font-semibold text-text-base">게시글 작성</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-text-base"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <TravelPostForm />
      </div>
    </div>
  )
}
