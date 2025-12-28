import MenuItem from '../MenuItem'

export default function SubMenu() {
  return (
    <nav className="space-y-3">
      <MenuItem path="/member/received" label="받은 동행 신청" />
      <MenuItem path="/member/sent" label="신청한 동행" />
      <MenuItem path="/member/post" label="내 게시글" />
      <MenuItem path="/member/bookmark" label="찜한 게시글" />
    </nav>
  )
}
