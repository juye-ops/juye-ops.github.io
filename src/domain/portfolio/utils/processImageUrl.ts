import { PKMS_PATH } from "@/shared/constants/env";

export function processImageUrl(src: string) {
  if (!src) return '';
  if (src.startsWith('http')) return src;

  // 1. 앞의 ./ 또는 /를 완전히 제거하여 깨끗한 경로만 남김
  const cleanPath = src.replace(/^(\.\/|\/)+/, '');

  // ROOT 주소 끝에 /가 있고, cleanPath 시작이 /일 경우를 대비해 처리
  const root = PKMS_PATH?.replace(/\/$/, '');
  return `${root}/${cleanPath}`;
}