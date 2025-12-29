import { Virtuoso } from 'react-virtuoso'

import { useChatRooms } from '@/api/chat/chatroom.queries'
import { Spinner } from '@/components/ui/spinner'
import { ChatRoomContent, ChatRoomFilters } from '@/types/chat/chats.types'

import ChatCard from './ChatCard'

export const MOCK_CHAT_ROOMS: ChatRoomContent[] = [
  {
    chatRoomId: 1,
    chatParticipantId: 101,
    unreadCount: 2,
    title: '서울 성수동 카페 투어 & 인생샷 건지실 분 📸',
    thumbnail: 'https://picsum.photos/seed/1/200/200',
    tags: ['카페투어', '사진촬영', '인생샷'],
    nation: 'KR',
    region: '서울',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    recruitStatus: 'RECRUITING',
    lastMessage: '오후 2시에 대림창고 앞에서 뵐까요?',
    lastMessageAt: '2024-12-29 14:20:00',
  },
  {
    chatRoomId: 2,
    chatParticipantId: 102,
    unreadCount: 0,
    title: '후쿠오카 3박 4일 먹방 동행 구해요 (유후인 포함)',
    thumbnail: null, // ⚠️ 이미지 없음 (기본 이미지 테스트용)
    tags: ['맛집탐방', '온천', '힐링'],
    nation: 'JP',
    region: '후쿠오카',
    startDate: '2025-02-10',
    endDate: '2025-02-13',
    recruitStatus: 'RECRUITING',
    lastMessage: '료칸 예약은 제가 이미 해뒀습니다!',
    lastMessageAt: '2024-12-29 10:05:30',
  },
  {
    chatRoomId: 3,
    chatParticipantId: 103,
    unreadCount: 15,
    title: '방콕 카오산로드의 밤을 즐기실 파티원 모집 🍻',
    thumbnail: 'https://picsum.photos/seed/3/200/200',
    tags: ['밤문화', '파티', '배낭여행'],
    nation: 'TH',
    region: '방콕',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    recruitStatus: 'RECRUITING',
    lastMessage: '맥주 좋아하시는 분 환영해요',
    lastMessageAt: '2024-12-29 16:45:12',
  },
  {
    chatRoomId: 4,
    chatParticipantId: 104,
    unreadCount: 0,
    title: '강원도 양양 서핑 강습 같이 받아요 🏄‍♂️',
    thumbnail: 'https://picsum.photos/seed/4/200/200',
    tags: ['서핑', '액티비티', '초보환영'],
    nation: 'KR',
    region: '양양',
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    recruitStatus: 'CLOSED',
    lastMessage: '인원이 마감되었습니다. 죄송합니다.',
    lastMessageAt: '2024-12-28 18:30:00',
  },
  {
    chatRoomId: 5,
    chatParticipantId: 105,
    unreadCount: 1,
    title: '오사카 유니버설 스튜디오 닌텐도 월드 공략',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['테마파크', 'USJ', '닌텐도'],
    nation: 'JP',
    region: '오사카',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    recruitStatus: 'RECRUITING',
    lastMessage: '확약권 시간 확인하셨나요?',
    lastMessageAt: '2024-12-29 12:00:00',
  },
  {
    chatRoomId: 6,
    chatParticipantId: 106,
    unreadCount: 3,
    title: '제주도 올레길 7코스 함께 걸어요 🌿',
    thumbnail: 'https://picsum.photos/seed/6/200/200',
    tags: ['트레킹', '자연', '걷기'],
    nation: 'KR',
    region: '제주',
    startDate: '2025-02-01',
    endDate: '2025-02-01',
    recruitStatus: 'RECRUITING',
    lastMessage: '편한 신발 신고 오시면 됩니다.',
    lastMessageAt: '2024-12-29 09:15:00',
  },
  {
    chatRoomId: 7,
    chatParticipantId: 107,
    unreadCount: 0,
    title: '파리 루브르 박물관 도슨트 투어 쉐어하실 분',
    thumbnail: 'https://picsum.photos/seed/7/200/200',
    tags: ['예술', '박물관', '역사'],
    nation: 'FR',
    region: '파리',
    startDate: '2025-04-12',
    endDate: '2025-04-12',
    recruitStatus: 'RECRUITING',
    lastMessage: '입장권은 개별 구매입니다.',
    lastMessageAt: '2024-12-27 21:00:00',
  },
  {
    chatRoomId: 8,
    chatParticipantId: 108,
    unreadCount: 8,
    title: '대만 타이베이 딤섬 맛집 도장깨기 🥟',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['먹방', '미식회', '소룡포'],
    nation: 'TW',
    region: '타이베이',
    startDate: '2025-01-10',
    endDate: '2025-01-13',
    recruitStatus: 'RECRUITING',
    lastMessage: '딘타이펑 본점 웨이팅 팁 공유해요',
    lastMessageAt: '2024-12-29 15:30:45',
  },
  {
    chatRoomId: 9,
    chatParticipantId: 109,
    unreadCount: 0,
    title: '뉴욕 타임스퀘어 새해 카운트다운 볼드랍',
    thumbnail: 'https://picsum.photos/seed/9/200/200',
    tags: ['새해', '이벤트', '버킷리스트'],
    nation: 'US',
    region: '뉴욕',
    startDate: '2024-12-31',
    endDate: '2025-01-01',
    recruitStatus: 'COMPLETED',
    lastMessage: '다들 고생하셨고 새해 복 많이 받으세요!',
    lastMessageAt: '2024-12-29 17:10:00',
  },
  {
    chatRoomId: 10,
    chatParticipantId: 110,
    unreadCount: 5,
    title: '다낭 호이안 올드타운 & 소원배 타기 🏮',
    thumbnail: 'https://picsum.photos/seed/10/200/200',
    tags: ['야경', '감성', '사진'],
    nation: 'VN',
    region: '다낭',
    startDate: '2025-01-22',
    endDate: '2025-01-24',
    recruitStatus: 'RECRUITING',
    lastMessage: '아오자이 맞춰 입고 가요!',
    lastMessageAt: '2024-12-29 13:50:00',
  },
  {
    chatRoomId: 11,
    chatParticipantId: 111,
    unreadCount: 0,
    title: '경주 황리단길 한복 체험하고 스냅사진 찍어요',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['전통체험', '데이트', '스냅'],
    nation: 'KR',
    region: '경주',
    startDate: '2025-03-15',
    endDate: '2025-03-15',
    recruitStatus: 'RECRUITING',
    lastMessage: '제가 카메라 가져가겠습니다.',
    lastMessageAt: '2024-12-28 11:20:00',
  },
  {
    chatRoomId: 12,
    chatParticipantId: 112,
    unreadCount: 12,
    title: '런던 토트넘 홋스퍼 스타디움 직관 모임 ⚽',
    thumbnail: 'https://picsum.photos/seed/12/200/200',
    tags: ['축구', '스포츠', '직관'],
    nation: 'GB',
    region: '런던',
    startDate: '2025-02-15',
    endDate: '2025-02-15',
    recruitStatus: 'RECRUITING',
    lastMessage: '경기 끝나고 펍 가서 맥주 한잔 하시죠',
    lastMessageAt: '2024-12-29 14:00:00',
  },
  {
    chatRoomId: 13,
    chatParticipantId: 113,
    unreadCount: 0,
    title: '부산 해운대 요트 투어 1/N 하실 분 구합니다 ⛵',
    thumbnail: 'https://picsum.photos/seed/13/200/200',
    tags: ['럭셔리', '바다', '야경'],
    nation: 'KR',
    region: '부산',
    startDate: '2025-01-08',
    endDate: '2025-01-08',
    recruitStatus: 'RECRUITING',
    lastMessage: '선셋 타임으로 예약할게요.',
    lastMessageAt: '2024-12-29 10:30:00',
  },
  {
    chatRoomId: 14,
    chatParticipantId: 114,
    unreadCount: 2,
    title: '스위스 인터라켄 패러글라이딩 겁 없는 분들만',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['익스트림', '액티비티', '알프스'],
    nation: 'CH',
    region: '인터라켄',
    startDate: '2025-05-20',
    endDate: '2025-05-22',
    recruitStatus: 'RECRUITING',
    lastMessage: '날씨 안 좋으면 환불 되나요?',
    lastMessageAt: '2024-12-29 16:15:00',
  },
  {
    chatRoomId: 15,
    chatParticipantId: 115,
    unreadCount: 0,
    title: '도쿄 아키하바라 피규어 쇼핑 원정대',
    thumbnail: 'https://picsum.photos/seed/15/200/200',
    tags: ['쇼핑', '덕질', '애니메이션'],
    nation: 'JP',
    region: '도쿄',
    startDate: '2025-01-05',
    endDate: '2025-01-06',
    recruitStatus: 'CLOSED',
    lastMessage: '캐리어 큰 거 가져오세요 ㅋㅋ',
    lastMessageAt: '2024-12-28 22:40:00',
  },
  {
    chatRoomId: 16,
    chatParticipantId: 116,
    unreadCount: 1,
    title: '발리 우붓 요가반 클래스 같이 들어요 🧘‍♀️',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['요가', '웰니스', '명상'],
    nation: 'ID',
    region: '발리',
    startDate: '2025-02-11',
    endDate: '2025-02-11',
    recruitStatus: 'RECRUITING',
    lastMessage: '초보자 클래스로 신청할게요',
    lastMessageAt: '2024-12-29 11:55:00',
  },
  {
    chatRoomId: 17,
    chatParticipantId: 117,
    unreadCount: 4,
    title: '여수 밤바다 낭만포차 번개 모임 ⚡',
    thumbnail: 'https://picsum.photos/seed/17/200/200',
    tags: ['술자리', '친목', '국내여행'],
    nation: 'KR',
    region: '여수',
    startDate: '2025-01-01',
    endDate: '2025-01-01',
    recruitStatus: 'RECRUITING',
    lastMessage: '해물삼합 먹으러 가요!',
    lastMessageAt: '2024-12-29 17:00:00',
  },
  {
    chatRoomId: 18,
    chatParticipantId: 118,
    unreadCount: 0,
    title: '아이슬란드 오로라 헌팅 렌터카 쉐어 🌌',
    thumbnail: 'https://picsum.photos/seed/18/200/200',
    tags: ['자연', '로드트립', '오로라'],
    nation: 'IS',
    region: '레이캬비크',
    startDate: '2025-02-20',
    endDate: '2025-02-25',
    recruitStatus: 'RECRUITING',
    lastMessage: '국제운전면허증 필수입니다.',
    lastMessageAt: '2024-12-28 14:20:00',
  },
  {
    chatRoomId: 19,
    chatParticipantId: 119,
    unreadCount: 7,
    title: '시드니 오페라 하우스 공연 관람 후 디너',
    thumbnail: 'https://picsum.photos/seed/19/200/200',
    tags: ['공연', '문화생활', '다이닝'],
    nation: 'AU',
    region: '시드니',
    startDate: '2025-03-10',
    endDate: '2025-03-10',
    recruitStatus: 'RECRUITING',
    lastMessage: '어떤 공연 예매하셨나요?',
    lastMessageAt: '2024-12-29 08:40:00',
  },
  {
    chatRoomId: 20,
    chatParticipantId: 120,
    unreadCount: 0,
    title: '몽골 게르 숙박 & 별 구경 투어 모집 🌟',
    thumbnail: null, // ⚠️ 이미지 없음
    tags: ['캠핑', '별구경', '사막'],
    nation: 'MN',
    region: '울란바토르',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    recruitStatus: 'RECRUITING',
    lastMessage: '침낭 챙겨와야 하나요?',
    lastMessageAt: '2024-12-29 12:10:00',
  },
]
export default function ChatList({ filters }: { filters: ChatRoomFilters }) {
  const { chatRooms, fetchNextPage, hasNextPage, isLoading } =
    useChatRooms(filters)

  if (isLoading)
    return (
      <div className="py-10 text-center">
        <Spinner />
      </div>
    )

  return (
    <Virtuoso
      useWindowScroll
      data={MOCK_CHAT_ROOMS}
      endReached={() => {
        if (hasNextPage) fetchNextPage()
      }}
      itemContent={(index, chat) => (
        <div className="pb-6">
          <ChatCard key={chat.chatRoomId} chat={chat} />
        </div>
      )}
      components={{
        Footer: () =>
          hasNextPage ? (
            <div className="py-4 text-center flex items-center justify-center gap-2">
              <Spinner />
              <p className="text-sm text-gray-500">더 불러오는 중...</p>
            </div>
          ) : null,
      }}
    />
  )
}
