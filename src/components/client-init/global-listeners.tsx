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

  /* GUSTAVO: This is not straight forward - Zindex needs to be dealt with */
  // useEffect(() => {
  //   const handleWindowZindexHierarchy = (e: MouseEvent) => {
  //     const clickTarget = e.target as HTMLElement;
  //     const windowElement = clickTarget.closest<HTMLDivElement>('#window-layout');
  //     if (!windowElement) return;

  //     const allWindows = document.querySelectorAll<HTMLDivElement>('#window-layout');
  //     const windowAndZIndex = [...allWindows].map((win) => {
  //       return { z: win.style.zIndex || '0', el: win };
  //     });

  //     const sortedWin = windowAndZIndex.sort();
  //     console.log(sortedWin);

  //     const prevZIndex = Number(windowElement.style.zIndex ?? 0);
  //     windowElement.style.zIndex = `${prevZIndex + 1}`;
  //   };

  //   document.addEventListener('mousedown', handleWindowZindexHierarchy);

  //   return () => document.removeEventListener('mousedown', handleWindowZindexHierarchy);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <></>;
}
