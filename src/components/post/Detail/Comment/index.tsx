import { MoreVertical, User } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/common'

export default function Comment() {
  const [commentText, setCommentText] = useState('')
  // 임시 데이터
  const [comments, setComments] = useState([
    {
      id: 1,
      nickname: '닉네임',
      time: '시간',
      comment: '댓글',
      replies: [
        {
          id: 2,
          nickname: '닉네임',
          time: '시간',
          comment: '댓글',
        },
        {
          id: 3,
          nickname: '닉네임',
          time: '23시간 전',
          comment: '댓글.',
        },
      ],
    },
    {
      id: 4,
      nickname: '닉네임',
      time: '1시간 전',
      comment: '댓글',
      replies: [],
    },
    {
      id: 5,
      nickname: '닉네임',
      time: '1시간 전',
      comment: '댓글.',
      replyCount: 1,
      replies: [],
    },
  ])

  return (
    <>
      <h2 className="text-xl font-bold text-text-base mb-6 p-8 mt-8">댓글</h2>
      {/* 댓글 입력 */}
      <div className="mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-text-base mb-3">
            <span className="font-semibold">닉네임</span>
          </p>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 남겨보세요"
            rows={3}
            className="w-full border rounded-lg px-4 py-3 text-sm text-text-base placeholder:text-text-input outline-none resize-none"
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="secondary" className="h-8">
              취소
            </Button>
            <Button className="h-8">등록</Button>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* 댓글 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-bg-input rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-text-input" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-base">
                      {comment.nickname}
                    </span>
                    <span className="text-xs text-text-input">
                      {comment.time}
                    </span>
                  </div>
                  <button className="text-text-input hover:text-text-base">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-text-base mb-2">{comment.comment}</p>
                <div className="flex items-center gap-4 text-sm">
                  <button className="text-main hover:underline">
                    답글달기
                  </button>
                  {comment.replyCount && (
                    <button className="text-text-input">
                      답글 {comment.replyCount}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 대댓글 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-16 mt-4 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <div className="w-10 h-10 bg-bg-input rounded-full flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-text-input" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-base text-sm">
                            {reply.nickname}
                          </span>
                          <span className="text-xs text-text-input">
                            {reply.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-base mb-2">
                        {reply.comment}
                      </p>
                      <button className="text-sm text-main hover:underline">
                        답글달기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
