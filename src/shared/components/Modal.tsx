// @/shared/components/Modal.tsx
import type { ReactNode } from "react";
import { createPortal } from "react-dom"; // 1. 포탈 임포트

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  // 2. Next.js SSR 시점 브라우저 객체 체크 (한 줄 방어 코드)
  if (typeof window === "undefined") return null;

  // 3. 기존 리턴문을 createPortal로 감싸서 body로 던지기만 하면 끝
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="닫기"
      />

      {/* dialog */}
      <div className="relative z-10 w-full max-w-3xl max-h-[80vh] rounded-xl bg-white  shadow-xl flex flex-col">
        <header className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 ">
          <h2 className="text-base md:text-lg font-medium truncate">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-neutral-100 :bg-neutral-800">
            <span className="sr-only">닫기</span>
            <svg className="w-5 h-5 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="px-5 py-4 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body // <body> 하단으로 타겟팅
  );
}