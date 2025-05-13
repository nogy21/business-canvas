import type { RecordData } from '@/types/record';

export const STORAGE_MODES = {
  IN_MEMORY: 'in-memory',
  LOCAL_STORAGE: 'local-storage',
} as const;
export const STORAGE_MODE = import.meta.env.STORAGE || STORAGE_MODES.IN_MEMORY;
console.log('STORAGE:', import.meta.env.STORAGE);

const STORAGE_KEY = 'member-records';

/**
 * 회원 목록 로드
 * @returns 회원 목록
 */
export function loadRecords(): RecordData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * 회원 목록 저장
 * @param records 회원 목록
 */
export function saveRecords(records: RecordData[]) {
  try {
    console.log('saveRecords', records);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // 브라우저 저장소 제한 등 예외 처리 미구현
  }
}