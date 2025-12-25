'use client'

import { useState } from 'react'

import { IconDotsVertical } from '@/assets/svgr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-none rounded-3xl bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 댓글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-300 hover:bg-gray-100 bg-white text-gray-600 h-10 rounded-[12px] text-sm ring-1 ring-gray-300">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 h-10 rounded-[12px] text-sm"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function CommentMenu({
  onConfirm,
  startEdit,
}: {
  onConfirm: () => void
  startEdit: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconDotsVertical className="w-6 h-6" />
        </PopoverTrigger>
        <PopoverContent className="p-1 w-22 flex flex-col rounded-[12px]">
          <button
            onClick={startEdit}
            className="p-2.5 text-xs text-left hover:bg-blue-50 rounded-[8px]"
          >
            댓글 수정
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2.5 text-xs text-left text-red-500 hover:bg-red-50 rounded-[8px]"
          >
            댓글 삭제
          </button>
        </PopoverContent>
      </Popover>

      <DeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          onConfirm()
          setOpen(false)
        }}
      />
    </>
  )
}
