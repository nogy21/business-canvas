import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";

type MemberTableHeaderProps = {
  handleOpen: () => void;
};

/**
 * 회원 테이블 헤더
 * @param handleOpen 회원 추가 모달 열기
 */
export function MemberTableHeader({ handleOpen }: MemberTableHeaderProps) {
  return (
    <div className="flex items-center justify-between px-[14px]">
      <Title level={2} className="h-[48px] flex items-center mb-0! text-[16px]!">회원 목록</Title>
      <Button
        type="primary"
        className="rounded-full"
        icon={<PlusOutlined className="text-[11px]" />}
        onClick={handleOpen}
      >
        추가
      </Button>
    </div>
  );
}