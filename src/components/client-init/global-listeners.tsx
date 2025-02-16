'use client';
import { useCursorState } from '@/global-states/cursor-state';
import { useEffect } from 'react';

export default function GlobalAppListeners() {
  const { setX, setY } = useCursorState();

  useEffect(() => {
    const handleWindowPosition = (e: MouseEvent) => {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
    };

    document.addEventListener('pointermove', handleWindowPosition);

    return () => document.removeEventListener('pointermove', handleWindowPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
