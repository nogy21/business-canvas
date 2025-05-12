import { ConfigProvider } from 'antd'
import Title from 'antd/lib/typography/Title'
import koKR from 'antd/locale/ko_KR'

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
      <div className="p-6">
        <Title level={2} className="mb-6">
          회원 목록
        </Title>
      </div>
    </ConfigProvider>
  )
}
