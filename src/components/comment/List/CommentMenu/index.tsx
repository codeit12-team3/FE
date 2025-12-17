import { useState } from 'react'

import { IconDotsVertical } from '@/assets/svgr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'

import DeleteDialog from '../DeleteDialog'

interface CommentMenuProps {
  onConfirm: () => void
}

export default function CommentMenu({ onConfirm }: CommentMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconDotsVertical className="w-6 h-6" />
        </PopoverTrigger>
        <PopoverContent className="p-1 w-22 flex flex-col rounded-[12px]">
          <button className="p-2.5 text-xs text-left hover:bg-blue-50 hover:text-blue-600 rounded-[8px]">
            댓글 수정
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-2.5 text-xs text-left text-red-500 hover:bg-red-50 rounded-[8px]"
          >
            댓글 삭제
          </button>
        </PopoverContent>
      </Popover>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onConfirm}
      />
    </>
  )
}
