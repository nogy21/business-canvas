# 비즈니스캔버스 프론트엔드 개발자 과제

## 프로젝트 개요
- 회원 목록을 관리하는 테이블 UI 구현
- Figma 디자인과 최대한 동일하게 스타일링
- CRUD, 필터, 검증 등 실무적 요구사항 반영

## 기술 스택
- React, TypeScript, Ant Design, Tailwind CSS, Vite
- 기타: dayjs

## 폴더 구조/설계
- `src/components`: UI 컴포넌트
- `src/types`: 타입 정의
- `src/data`: 초기 데이터/필드 정의
- `src/utils`: 유틸리티 함수
- `src/constants`: 상수 정의


## 실행 방법
- `.env.sample` 파일을 `.env`로 복사하고 환경 변수 설정해주시면 됩니다.
- node.js v22.15.0에서 진행했습니다. (`.nvmrc` 파일 참고)
```bash
pnpm install
# 또는 yarn
pnpm run dev
```

