'use client'

import { useSession } from 'next-auth/react' // 1. NextAuth 훅 가져오기
import { useEffect, useRef, useState } from 'react'

export default function WebSocketTest() {
  const { data: session } = useSession() // 2. 세션 데이터 가져오기
  const [logs, setLogs] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const ws = useRef<WebSocket | null>(null)
  console.log('Current session:', session)

  const connect = () => {
    // 3. 세션에서 토큰 꺼내기
    // 주의: NextAuth 설정(callbacks)에 따라 토큰 위치가 다를 수 있습니다.
    // 보통 session.accessToken 또는 session.user.accessToken 에 저장합니다.
    const token = session?.user.accessToken

    if (!token) {
      addLog('❌ NextAuth 세션에 액세스 토큰이 없습니다!')
      addLog(
        '💡 NextAuth 설정(callbacks)에서 토큰을 세션에 포함시켰는지 확인해주세요.',
      )
      console.log('현재 세션 상태:', session) // 콘솔에서 확인해보세요
      return
    }

    // 4. URL에 토큰 붙이기
    const socketUrl = `ws://api.tripus.site/ws-chat?chatRoomId=12&chatParticipantId=${session.user.memberId}`

    addLog(`[연결 시도] 토큰 포함하여 접속 중...`)

    // 기존 연결 끊기
    if (ws.current) ws.current.close()

    ws.current = new WebSocket(socketUrl)

    ws.current.onopen = () => {
      addLog('✅ [성공] 웹소켓 연결됨!')
      setIsConnected(true)
    }

    ws.current.onmessage = (event) => {
      addLog(`📩 [메시지 수신] ${event.data}`)
    }

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error)
      addLog('❌ [에러] 연결 실패 (콘솔 확인)')
    }

    ws.current.onclose = (event) => {
      addLog(`🔌 [종료] 연결 끊김 (코드: ${event.code})`)
      setIsConnected(false)
    }
  }

  const disconnect = () => {
    if (ws.current) {
      ws.current.close()
    }
  }

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => [`[${time}] ${msg}`, ...prev])
  }

  useEffect(() => {
    return () => disconnect()
  }, [])

  return (
    <div className="p-4 border-2 border-blue-500 m-4 rounded-xl bg-gray-50">
      <h2 className="text-xl font-bold mb-4">WebSocket 테스트 (NextAuth)</h2>

      <div className="mb-2 text-sm text-gray-600">
        로그인 상태: {session ? '✅ 로그인됨' : '❌ 로그인 안됨'}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={connect}
          disabled={isConnected}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          연결 시작
        </button>
        <button
          onClick={disconnect}
          disabled={!isConnected}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
        >
          연결 종료
        </button>
      </div>

      <div className="bg-black text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">로그가 여기에 표시됩니다...</p>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}
