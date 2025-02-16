'use client';
import { useCursorState } from '@/global-states/cursorPoint';
import { useEffect } from 'react';

export default function GlobalAppListeners() {
  const { /* x, y, */ setX, setY } = useCursorState();

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

  // useEffect(() => {
  //   console.log(x, y);
  // }, [x, y]);

  return <></>;
}
