import type { RecordData } from "@/types/record";
import dayjs from "dayjs";

/**
 * 회원 레코드 정규화
 * @param values 회원 레코드
 * @returns 정규화된 회원 레코드
 */
export const normalizeRecord = (values: RecordData): RecordData => {
  const joinedAt =
    typeof values.joinedAt === 'object' && values.joinedAt && 'format' in values.joinedAt
      ? values.joinedAt.format('YYYY-MM-DD')
      : typeof values.joinedAt === 'string'
        ? values.joinedAt
        : '';
  const emailOptIn = typeof values.emailOptIn === 'boolean' ? values.emailOptIn : false;
  return { ...values, joinedAt, emailOptIn };
}

/**
 * 회원 추가
 * @param records 회원 목록
 * @param newRecord 추가할 회원 레코드
 * @returns 추가된 회원 목록
 */
export function addMember(records: RecordData[], newRecord: RecordData): RecordData[] {
  return [...records, normalizeRecord(newRecord)];
}

/**
 * 회원 수정
 * @param records 회원 목록
 * @param editKey 수정할 회원 이름
 * @param updated 수정할 회원 레코드
 */
export function editMember(records: RecordData[], editKey: string, updated: RecordData): RecordData[] {
  return records.map(r => r.name === editKey ? normalizeRecord({ ...r, ...updated }) : r);
}

/**
 * 수정 초기값 변환
 * @param record 수정할 회원 레코드
 * @returns 수정 초기값
 */
export function toEditInitialValues(record: RecordData): RecordData {
  let joinedAt: string | dayjs.Dayjs = '';
  if (
    typeof record.joinedAt === 'string' ||
    typeof record.joinedAt === 'number' ||
    record.joinedAt instanceof Date ||
    (typeof record.joinedAt === 'object' && record.joinedAt && 'isValid' in record.joinedAt)
  ) {
    joinedAt = dayjs(record.joinedAt);
  }
  return {
    ...normalizeRecord(record),
    joinedAt,
  };
}

/**
 * 회원 삭제
 * @param records 회원 목록
 * @param deleteKey 삭제할 회원 이름
 * @returns 삭제된 회원 목록
 */
export function removeMember(records: RecordData[], deleteKey: string): RecordData[] {
  return records.filter(r => r.name !== deleteKey);
}