/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useCursorState } from '@/states/cursorPoint';
import { useEffect, useState } from 'react';

type Coord = { x: number; y: number };

export default function AppWindow() {
  const { x, y } = useCursorState();
  const [coordOffset, setCoordOffset] = useState<Coord>({ x: 0, y: 0 });

  /* THIS WILL BECOME A STORE FOR EACH WINDOW */
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [winCoord, setWinCoord] = useState<Coord>({ x: 10, y: 10 });
  /* ________________________ */

  useEffect(() => {
    if (!isDragging) return;
    const adjustedX = x - coordOffset.x;
    const ajdustedY = y - coordOffset.y;
    setWinCoord({ x: adjustedX, y: ajdustedY });
  }, [isDragging, x, y]);

  const handleNavbarClick = (isDragging: boolean) => {
    setCoordOffset({ x: x - winCoord.x, y: y - winCoord.y });
    setIsDragging(isDragging);
  };

  return (
    <div
      style={{ top: `${winCoord.y}px`, left: `${winCoord.x}px` }}
      className={`fixed border-2 border-black bg-white shadow-2xl`}
      onMouseUp={() => handleNavbarClick(false)}
    >
      <nav onMouseDown={() => handleNavbarClick(true)} className="w-full h-8 bg-neutral-800"></nav>
      <h3>Window</h3>
      <p>I am a window</p>
    </div>
  );
}
