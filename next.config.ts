import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 정적 HTML로 내보내기 설정
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화 서버를 지원하지 않음
  },
};

export default nextConfig;
