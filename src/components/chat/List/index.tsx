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
    title: '서울 근교 카페 투어 가실 분 ☕',
    thumbnail: null,
    nation: 'KR',
    region: '서울',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    recruitStatus: 'RECRUITING',
    lastMessage: '참여하고 싶어요!',
    lastMessageAt: '2024-12-29 14:20:00',
  },
  {
    chatRoomId: 2,
    chatParticipantId: 102,
    unreadCount: 0,
    title: '후쿠오카 3박 4일 동행 구해요 ✈️',
    thumbnail: 'https://picsum.photos/seed/2/200/200',
    nation: 'JP',
    region: '후쿠오카',
    startDate: '2025-02-10',
    endDate: '2025-02-13',
    recruitStatus: 'RECRUITING',
    lastMessage: '항공권 예매하셨나요?',
    lastMessageAt: '2024-12-29 10:05:30',
  },
  {
    chatRoomId: 3,
    chatParticipantId: 103,
    unreadCount: 15,
    title: '방콕 야시장 먹방 파티 🍜',
    thumbnail: 'https://picsum.photos/seed/3/200/200',
    nation: 'TH',
    region: '방콕',
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    recruitStatus: 'RECRUITING',
    lastMessage: '여기 진짜 맛있어 보여요',
    lastMessageAt: '2024-12-29 16:45:12',
  },
  {
    chatRoomId: 4,
    chatParticipantId: 104,
    unreadCount: 0,
    title: '강원도 서핑 초보 환영! 🏄‍♂️',
    thumbnail: 'https://picsum.photos/seed/4/200/200',
    nation: 'KR',
    region: '양양',
    startDate: '2025-03-01',
    endDate: '2025-03-02',
    recruitStatus: 'CLOSED',
    lastMessage: '모집 마감되었습니다.',
    lastMessageAt: '2024-12-28 18:30:00',
  },
  {
    chatRoomId: 5,
    chatParticipantId: 105,
    unreadCount: 1,
    title: '오사카 유니버설 스튜디오 같이 가요',
    thumbnail: 'https://picsum.photos/seed/5/200/200',
    nation: 'JP',
    region: '오사카',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    recruitStatus: 'RECRUITING',
    lastMessage: '익스프레스권 사야할까요?',
    lastMessageAt: '2024-12-29 12:00:00',
  },
  {
    chatRoomId: 6,
    chatParticipantId: 106,
    unreadCount: 3,
    title: '제주도 한 달 살기 정보 공유방',
    thumbnail: 'https://picsum.photos/seed/6/200/200',
    nation: 'KR',
    region: '제주',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    recruitStatus: 'RECRUITING',
    lastMessage: '숙소 추천 부탁드려요',
    lastMessageAt: '2024-12-29 09:15:00',
  },
  {
    chatRoomId: 7,
    chatParticipantId: 107,
    unreadCount: 0,
    title: '파리 루브르 박물관 오전 동행',
    thumbnail: 'https://picsum.photos/seed/7/200/200',
    nation: 'FR',
    region: '파리',
    startDate: '2025-04-12',
    endDate: '2025-04-12',
    recruitStatus: 'RECRUITING',
    lastMessage: '9시 정문 앞에서 봐요',
    lastMessageAt: '2024-12-27 21:00:00',
  },
  {
    chatRoomId: 8,
    chatParticipantId: 108,
    unreadCount: 8,
    title: '대만 타이베이 딤섬 맛집 투어',
    thumbnail: 'https://picsum.photos/seed/8/200/200',
    nation: 'TW',
    region: '타이베이',
    startDate: '2025-01-10',
    endDate: '2025-01-13',
    recruitStatus: 'RECRUITING',
    lastMessage: '딘타이펑 웨이팅 길까요?',
    lastMessageAt: '2024-12-29 15:30:45',
  },
  {
    chatRoomId: 9,
    chatParticipantId: 109,
    unreadCount: 0,
    title: '뉴욕 타임스퀘어 새해 카운트다운',
    thumbnail: 'https://picsum.photos/seed/9/200/200',
    nation: 'US',
    region: '뉴욕',
    startDate: '2024-12-31',
    endDate: '2025-01-01',
    recruitStatus: 'COMPLETED',
    lastMessage: '다들 새해 복 많이 받으세요!',
    lastMessageAt: '2024-12-29 17:10:00',
  },
  {
    chatRoomId: 10,
    chatParticipantId: 110,
    unreadCount: 5,
    title: '다낭 호이안 올드타운 밤거리 산책',
    thumbnail: 'https://picsum.photos/seed/10/200/200',
    nation: 'VN',
    region: '다낭',
    startDate: '2025-01-22',
    endDate: '2025-01-24',
    recruitStatus: 'RECRUITING',
    lastMessage: '등불 켜진 거 너무 예뻐요',
    lastMessageAt: '2024-12-29 13:50:00',
  },
  {
    chatRoomId: 11,
    chatParticipantId: 111,
    unreadCount: 0,
    title: '경주 황리단길 한복 체험',
    thumbnail: 'https://picsum.photos/seed/11/200/200',
    nation: 'KR',
    region: '경주',
    startDate: '2025-03-15',
    endDate: '2025-03-15',
    recruitStatus: 'RECRUITING',
    lastMessage: '예쁜 한복 대여점 아시는 분?',
    lastMessageAt: '2024-12-28 11:20:00',
  },
  {
    chatRoomId: 12,
    chatParticipantId: 112,
    unreadCount: 12,
    title: '런던 프리미어리그 직관 모임 ⚽',
    thumbnail: 'https://picsum.photos/seed/12/200/200',
    nation: 'GB',
    region: '런던',
    startDate: '2025-02-15',
    endDate: '2025-02-15',
    recruitStatus: 'RECRUITING',
    lastMessage: '티켓팅 성공했습니다!',
    lastMessageAt: '2024-12-29 14:00:00',
  },
  {
    chatRoomId: 13,
    chatParticipantId: 113,
    unreadCount: 0,
    title: '부산 해운대 요트 투어 하실 분',
    thumbnail: 'https://picsum.photos/seed/13/200/200',
    nation: 'KR',
    region: '부산',
    startDate: '2025-01-08',
    endDate: '2025-01-08',
    recruitStatus: 'RECRUITING',
    lastMessage: '몇 시 타임인가요?',
    lastMessageAt: '2024-12-29 10:30:00',
  },
  {
    chatRoomId: 14,
    chatParticipantId: 114,
    unreadCount: 2,
    title: '스위스 인터라켄 패러글라이딩',
    thumbnail: 'https://picsum.photos/seed/14/200/200',
    nation: 'CH',
    region: '인터라켄',
    startDate: '2025-05-20',
    endDate: '2025-05-22',
    recruitStatus: 'RECRUITING',
    lastMessage: '날씨 좋았으면 좋겠네요',
    lastMessageAt: '2024-12-29 16:15:00',
  },
  {
    chatRoomId: 15,
    chatParticipantId: 115,
    unreadCount: 0,
    title: '도쿄 아키하바라 굿즈 탐방',
    thumbnail: 'https://picsum.photos/seed/15/200/200',
    nation: 'JP',
    region: '도쿄',
    startDate: '2025-01-05',
    endDate: '2025-01-06',
    recruitStatus: 'CLOSED',
    lastMessage: '인원 다 찼습니다.',
    lastMessageAt: '2024-12-28 22:40:00',
  },
  {
    chatRoomId: 16,
    chatParticipantId: 116,
    unreadCount: 1,
    title: '발리 우붓 요가 클래스 동행',
    thumbnail: 'https://picsum.photos/seed/16/200/200',
    nation: 'ID',
    region: '발리',
    startDate: '2025-02-11',
    endDate: '2025-02-11',
    recruitStatus: 'RECRUITING',
    lastMessage: '요가복 챙겨가야 하나요?',
    lastMessageAt: '2024-12-29 11:55:00',
  },
  {
    chatRoomId: 17,
    chatParticipantId: 117,
    unreadCount: 4,
    title: '여수 밤바다 포차거리 번개',
    thumbnail: 'https://picsum.photos/seed/17/200/200',
    nation: 'KR',
    region: '여수',
    startDate: '2025-01-01',
    endDate: '2025-01-01',
    recruitStatus: 'RECRUITING',
    lastMessage: '오늘 저녁에 모여요!',
    lastMessageAt: '2024-12-29 17:00:00',
  },
  {
    chatRoomId: 18,
    chatParticipantId: 118,
    unreadCount: 0,
    title: '아이슬란드 오로라 헌팅 투어',
    thumbnail: 'https://picsum.photos/seed/18/200/200',
    nation: 'IS',
    region: '레이캬비크',
    startDate: '2025-02-20',
    endDate: '2025-02-25',
    recruitStatus: 'RECRUITING',
    lastMessage: '렌터카 운전 가능하신 분?',
    lastMessageAt: '2024-12-28 14:20:00',
  },
  {
    chatRoomId: 19,
    chatParticipantId: 119,
    unreadCount: 7,
    title: '시드니 오페라 하우스 공연 관람',
    thumbnail: 'https://picsum.photos/seed/19/200/200',
    nation: 'AU',
    region: '시드니',
    startDate: '2025-03-10',
    endDate: '2025-03-10',
    recruitStatus: 'RECRUITING',
    lastMessage: '드레스코드 있을까요?',
    lastMessageAt: '2024-12-29 08:40:00',
  },
  {
    chatRoomId: 20,
    chatParticipantId: 120,
    unreadCount: 0,
    title: '전주 비빔밥 축제 같이 가요',
    thumbnail: 'https://picsum.photos/seed/20/200/200',
    nation: 'KR',
    region: '전주',
    startDate: '2025-10-10',
    endDate: '2025-10-12',
    recruitStatus: 'RECRUITING',
    lastMessage: '맛있겠네요 츄릅',
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
      /** * 1. style 대신 useWindowScroll을 사용합니다.
       * 이렇게 하면 Virtuoso 자체 스크롤이 아닌 페이지 스크롤을 감지합니다.
       */
      useWindowScroll
      /** * 2. 데이터는 MOCK 대신 실제 데이터를 넣으셔도 되고,
       * 테스트 중이라면 MOCK을 그대로 두셔도 됩니다.
       */
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
