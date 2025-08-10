import { Outlet, useNavigate } from 'react-router';
import { cn } from '../../../../shared/utils/cn';
import { Button } from '../../../../shared/ui';

export function Layout() {
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col h-screen overflow-hidden")}>
      {/* 네비게이션 바 - 높이 고정 혹은 내용에 맞게 */}
      <div className={cn("flex justify-center p-2.5 bg-gray-100 border-t border-gray-200 gap-2.5 overflow-x-auto flex-none")}>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/about')}>About</Button>
        <Button onClick={() => navigate('/portfolio')}>Portfolio</Button>
        <Button onClick={() => navigate('/blog')}>Blog</Button>
      </div>

      {/* Outlet 영역 - 화면 남은 공간 다 차지, 내부 스크롤만 허용 */}
      <div className={cn("flex-1 overflow-y-auto")}>
        <Outlet />
      </div>
    </div>
  );
}