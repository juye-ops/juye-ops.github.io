// features/NavButtonLogic.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { NavBoardProps } from '../../../../entities/Nav';

export function useNavButtonLogic({ data }: NavBoardProps) {
  const navigate = useNavigate();

  const paginate = (targetPage: string) => {
    if (targetPage !== null) {
      navigate(targetPage);
    }
  }

  return {
    paginate,
  };
}
