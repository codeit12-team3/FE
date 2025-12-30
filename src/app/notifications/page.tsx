import NotificationList from '@/components/notificaton/NotificationList'

export default function Page() {
  return (
    <main className="flex-1 flex flex-col px-4 py-6 md:px-6">
      <div className="max-w-[475px] w-full mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">알림</h2>
        <NotificationList />
      </div>
    </main>
  )
}
