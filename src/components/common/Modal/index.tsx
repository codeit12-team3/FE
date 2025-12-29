'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { IconX } from '@/assets/svgr'
import { useModalActions, useModalStore } from '@/stores'

export default function Modal() {
  const isOpen = useModalStore((state) => state.isOpen)
  const content = useModalStore((state) => state.content)
  const { closeModal } = useModalActions()

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        modalRef.current?.focus()
      })

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal()
      }
      window.addEventListener('keydown', handleEsc)

      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, closeModal])

  if (!isOpen) return null

  return createPortal(
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity cursor-pointer px-4"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col z-50 w-full max-w-md max-h-[90vh] overflow-y-auto p-8 bg-white rounded-3xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden translate-x-0.5 -translate-y-0.5 cursor-default"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <div className="flex justify-end shrink-0">
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-700 active:text-gray-700 transition-colors cursor-pointer"
            aria-label="창 닫기"
          >
            <IconX className="size-6" />
          </button>
        </div>
        <div className="overflow-y-auto">{content}</div>
      </div>
    </div>,
    document.body,
  )
}
