/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// GUSTAVO - Needs an associated store and button

import {
  iconWinClose,
  iconWinDemaximize,
  iconWinMaximize,
  iconWinMinimize,
} from '@/assets/svg-win-icons';
import { useCursorState } from '@/global-states/cursorPoint';
import { useEffect, useRef, useState } from 'react';

type Coord = { pointX: number; pointY: number };
type ResizeState = false | 'height' | 'width' | 'all';
type WinVisualState = 'closed' | 'maximized' | 'demaximized' | 'minimized';

const WIN_MIN_WIDTH = 200;
const WIN_MIN_HEIGHT = 120;

type StoreProp = {
  useStore: AppStore;
};

export default function AppWindow() {
  const { x, y } = useCursorState();
  const windowRef = useRef<HTMLDivElement>(null);

  /* GUSTAVO THIS WILL BECOME A STORE FOR EACH WINDOW */
  const [winVisualState, setWinVisualState] = useState<WinVisualState>('demaximized');
  const [dragClickOffset, setDragClickOffset] = useState<Coord>({ pointX: 0, pointY: 0 });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [winCoord, setWinCoord] = useState<Coord>({ pointX: 10, pointY: 10 });

  const [isResizing, setIsResizing] = useState<ResizeState>(false);
  const [winWidth, setWinWidth] = useState<number>(window.innerWidth * 0.9);
  const [winHeight, setWinHeight] = useState<number>(window.innerHeight * 0.8);
  /* ________________________ */

  useEffect(() => {
    if (!isDragging) return;

    if (winVisualState === 'maximized') demaximizeWindow();

    let adjustedX = x - dragClickOffset.pointX;
    if (x > window.innerWidth || x < 0) adjustedX = winCoord.pointX;

    let adjustedY = y - dragClickOffset.pointY;
    if (y > window.innerHeight || y < 0) adjustedY = winCoord.pointY;

    setWinCoord({ pointX: adjustedX, pointY: adjustedY });
  }, [isDragging, x, y]);

  const handleNavbarClick = (isDragging: boolean) => {
    setDragClickOffset({ pointX: x - winCoord.pointX, pointY: y - winCoord.pointY });
    setIsDragging(isDragging);
  };

  useEffect(() => {
    if (!isResizing) return;

    setWinVisualState('demaximized');
    if (isResizing === 'width') resizeWinWidth();
    if (isResizing === 'height') resizeWinHeight();
    if (isResizing === 'all') resizeWidthAndHeight();
  }, [isResizing, x, y]);

  const resizeWinWidth = () => {
    const winBox = windowRef.current?.getBoundingClientRect();
    if (!winBox) return;

    const minWinWidth = x - winBox.left < WIN_MIN_WIDTH;
    if (minWinWidth) return;

    const cursorOutOfBounds = x > window.innerWidth || x < 0;
    if (cursorOutOfBounds) return;

    const sizeDiff = x - winBox.right;
    setWinWidth((prev) => prev + sizeDiff);
  };

  const resizeWinHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect();
    if (!winBox) return;

    const minWinHeight = y - winBox.top < WIN_MIN_HEIGHT;
    if (minWinHeight) return;

    const cursorOutOfBounds = y > window.innerHeight || y < 0;
    if (cursorOutOfBounds) return;

    const sizeDiff = y - winBox.bottom;
    setWinHeight((prev) => prev + sizeDiff);
  };

  const resizeWidthAndHeight = () => {
    resizeWinWidth();
    resizeWinHeight();
  };

  const handleResizeClick = (isResizing: ResizeState) => {
    setIsResizing(isResizing);
  };

  const maximizeWindow = () => {
    setWinVisualState('maximized');
    setWinCoord({ pointX: 0, pointY: 0 });
    setWinHeight(window.innerHeight - 64);
    setWinWidth(window.innerWidth);
  };
  const demaximizeWindow = () => {
    setWinCoord({ pointX: 40, pointY: 40 });
    setWinWidth(window.innerWidth * 0.95);
    setWinHeight(window.innerHeight * 0.75);
    setWinVisualState('demaximized');
  };

  // GUSTAVO: Reminders...
  // z-index global values for selected window
  // Reset all isDraggin on mouse upp globally
  //
  return (
    <div
      ref={windowRef}
      style={{
        top: `${winCoord.pointY}px`,
        left: `${winCoord.pointX}px`,
        width: `${winWidth}px`,
        height: `${winHeight}px`,
      }}
      onMouseUp={() => {
        handleNavbarClick(false);
        handleResizeClick(false);
      }} // Gustavo: Both resets should reset on the app global level
      className={`fixed border-2 border-black bg-white shadow-2xl`}
    >
      <nav className="w-full h-8 bg-neutral-800 flex">
        <div
          onMouseDown={() => handleNavbarClick(true)}
          onDoubleClick={maximizeWindow}
          className="w-full h-8"
        ></div>
        <div className="flex justify-between gap-6 px-4">
          <button>{iconWinMinimize()}</button>
          {winVisualState === 'maximized' ? (
            <button onClick={demaximizeWindow}>{iconWinDemaximize()}</button>
          ) : (
            <button onClick={maximizeWindow}>{iconWinMaximize()}</button>
          )}
          <button>{iconWinClose()}</button>
        </div>
      </nav>

      <span
        onMouseDown={() => handleResizeClick('width')}
        id="win-resize-width"
        className="fixed w-2 bg-red-200 opacity-60 cursor-w-resize"
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX + winWidth - 4}px`,
          height: `${winHeight}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('height')}
        id="win-resize-height"
        className="fixed h-2 bg-red-200 opacity-60 cursor-s-resize"
        style={{
          top: `${winCoord.pointY + winHeight - 4}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
        }}
      ></span>
      <span
        onMouseDown={() => handleResizeClick('all')}
        id="win-resize-all"
        className="fixed h-3 w-3 bg-yellow-200 opacity-60 cursor-se-resize z-10"
        style={{
          top: `${winCoord.pointY + winHeight - 8}px`,
          left: `${winCoord.pointX + winWidth - 8}px`,
        }}
      ></span>

      {/* GUSTAVO: This inside should be children */}
      <h3>Window</h3>
      <p>I am a window</p>
    </div>
  );
}
