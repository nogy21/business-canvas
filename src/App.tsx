import { ConfigProvider } from 'antd'
import koKR from 'antd/locale/ko_KR'
import MemberTable from './components/MemberTable'

export default function App() {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
        },
      }}
    >
      <div>
        <MemberTable />
      </div>
    </ConfigProvider>
  )
}
