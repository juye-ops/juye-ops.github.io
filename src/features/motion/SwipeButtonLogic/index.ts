// features/SwipeButtonLogic.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { SwipeBoardProps } from '../../../entities/SwipeBoard';

export function useSwipeButtonLogic({ data }: SwipeBoardProps) {
  const [loadMotion, setLoadMotion] = useState(false);
  const [animate, setAnimate] = useState(0);
  const [[page, direction], setPage] = useState([1, 0]);
  const [targetPage, setTargetPage] = useState<string | null>(null);

  const navigate = useNavigate();

  // 새로고침인 경우 loadMotion true 처리 (생략 가능)
  useEffect(() => {
    setLoadMotion(true);
  }, []);

  const paginate = (newDirection: number) => {
    setPage(([currentPage, _]) => {
      setAnimate(1);
      let nextPage = currentPage + newDirection;
      if (nextPage < 0) nextPage = 0;
      else if (nextPage >= data.length) nextPage = data.length - 1;

      setTargetPage(data[nextPage].path);
      return [nextPage, newDirection];
    });
  };

  const onAnimate = () => {
    console.log(`Animating to page: ${page}`);
    if (targetPage !== null) {
      navigate(targetPage);
    }
  }

  return {
    animate,
    loadMotion,
    page,
    direction,
    paginate,
    onAnimate,
  };
}
