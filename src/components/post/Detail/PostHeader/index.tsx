import { useRouter } from 'next/navigation'

import {
  useAddBookmark,
  useDeletePost,
  usePostDetail,
  useRemoveBookmark,
} from '@/api/posts'
import {
  IconHeart,
  IconHeartSolid,
  IconPencil,
  IconTrashLight,
} from '@/assets/svgr'
import { formatDay } from '@/lib/common'

import PostActions from '../PostActions'
import PostManage from '../PostManage'

interface PostHeaderProps {
  postId: string

  onOpenApplyModal: () => void
}

export default function PostHeader({
  postId,
  onOpenApplyModal,
}: PostHeaderProps) {
  const { data: post } = usePostDetail({ postId })
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()
  const deletePost = useDeletePost()
  const router = useRouter()

  if (!post || !post.success) return null

  const {
    tags,
    title,
    isOwner,
    isApplied,
    isBookmarked,
    createdAt,

    stats,
    commentCount,
  } = post.data
  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark.mutate(postId)
    } else {
      addBookmark.mutate(postId)
    }
  }

  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`)
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠어요?')) return
    deletePost.mutate(postId, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  return (
    <div className="flex flex-col items-start gap-4 pl-2">
      <div className="flex gap-3 justify-between w-full items-center">
        <div className="flex gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-blue-50 rounded-full text-xs text-blue-500"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex gap-5">
          {isOwner ? (
            <PostManage postId={postId} />
          ) : (
            <PostActions
              onApply={onOpenApplyModal}
              hasApplied={isApplied}
              postId={postId}
            />
          )}
          <button
            onClick={handleToggleBookmark}
            className="hover:scale-90 transition-transform cursor-pointer"
            aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
          >
            {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
          </button>
        </div>
      </div>
      <h1 className="sm:text-3xl text-xl font-bold text-text-base">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-3 text-sm items-start sm:items-center w-full justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-gray-500">
            게시날짜{' '}
            <span className="text-gray-600">{formatDay(createdAt)}</span>
          </p>
          <span className="text-text-disabled">|</span>
          <p className="text-gray-500">
            조회수 <span className="text-gray-600">{stats.viewCount}</span>
          </p>
          <span className="text-text-disabled">|</span>
          <p className="text-gray-500">
            댓글 <span className="text-gray-600">{commentCount}</span>
          </p>
        </div>

        <div className="flex sm:hidden gap-5 w-full justify-between items-center">
          {isOwner ? (
            <PostManage postId={postId} />
          ) : (
            <PostActions
              onApply={onOpenApplyModal}
              hasApplied={isApplied}
              postId={postId}
            />
          )}
          <div className="flex gap-5 items-center">
            {isOwner && (
              <>
                <button
                  onClick={handleEdit}
                  className="cursor-pointer"
                  aria-label="게시글 수정"
                >
                  <IconPencil className="text-gray-400 size-6" />
                </button>

                <button
                  onClick={handleDelete}
                  className="cursor-pointer"
                  aria-label="게시글 삭제"
                >
                  <IconTrashLight className="text-gray-400 size-6" />
                </button>
              </>
            )}
            <button
              onClick={handleToggleBookmark}
              className="hover:scale-90 transition-transform cursor-pointer"
              aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
            >
              {isBookmarked ? <IconHeartSolid /> : <IconHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
