/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  iconWinClose,
  iconWinDemaximize,
  iconWinMaximize,
  iconWinMinimize,
} from '@/assets/svg-win-icons';
import { useCursorState } from '@/global-states/cursor-state';
import { useEffect, useRef } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import { AppStore, ResizeState } from './window-app-types';

const WIN_MIN_WIDTH = 240;
const WIN_MIN_HEIGHT = 120;

type StoreProp = {
  children: React.ReactNode;
  useAppStore: UseBoundStore<StoreApi<AppStore>>;
};

export default function WindowLayout({ children, useAppStore }: StoreProp) {
  const { x, y } = useCursorState();
  const windowRef = useRef<HTMLDivElement>(null);
  const {
    setOwnerWindow,

    winVisualState,
    setWinVisualState,

    isWinMinimized,

    dragClickOffset,
    setDragClickOffset,

    isDragging,
    setIsDragging,

    winCoord,
    setWinCoord,

    isResizing,
    setIsResizing,

    winWidth,
    setWinWidth,

    winHeight,
    setWinHeight,

    closeWindow,
    minimizeWindow,
    maximizeWindow,
    demaximizeWindow,
  } = useAppStore();

  useEffect(() => {
    setOwnerWindow(windowRef);
  }, [windowRef]);

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
    setWinWidth(winWidth + sizeDiff);
  };

  const resizeWinHeight = () => {
    const winBox = windowRef.current?.getBoundingClientRect();
    if (!winBox) return;

    const minWinHeight = y - winBox.top < WIN_MIN_HEIGHT;
    if (minWinHeight) return;

    const cursorOutOfBounds = y > window.innerHeight || y < 0;
    if (cursorOutOfBounds) return;

    const sizeDiff = y - winBox.bottom;
    setWinHeight(winHeight + sizeDiff);
  };

  const resizeWidthAndHeight = () => {
    resizeWinWidth();
    resizeWinHeight();
  };

  const handleResizeClick = (isResizing: ResizeState) => {
    setIsResizing(isResizing);
  };

  // GUSTAVO: Reminders...
  // z-index global values for selected window
  // Reset all isDraggin on mouse upp globally
  //
  return (
    <>
      <div
        id="window-layout"
        ref={windowRef}
        style={{
          top: `${winCoord.pointY}px`,
          left: `${winCoord.pointX}px`,
          width: `${winWidth}px`,
          height: `${winHeight}px`,

          /* MINIMIZE LOGIC */
          transition: 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isWinMinimized ? 0 : 1,
          transform: isWinMinimized
            ? `translate(${window.innerWidth / 2 - winCoord.pointX - winWidth / 2}px,
              ${window.innerHeight - winCoord.pointY - winHeight / 2}px) scale(0.02)`
            : '',
        }}
        onMouseUp={() => {
          handleNavbarClick(false);
          handleResizeClick(false);
        }}
        className={`
        fixed bg-white shadow-2xl
        ${winVisualState === 'closed' && 'hidden'}
        `}
      >
        <nav className="w-full h-8 bg-neutral-800 flex">
          <div
            onMouseDown={() => handleNavbarClick(true)}
            onDoubleClick={maximizeWindow}
            className="w-full h-8"
          ></div>
          <div className="flex justify-between px-1">
            <button className="hover:bg-gray-100 hover:bg-opacity-20 px-5" onClick={minimizeWindow}>
              {iconWinMinimize()}
            </button>
            {winVisualState === 'maximized' ? (
              <button className="hover:bg-gray-100 hover:bg-opacity-20 px-5" onClick={demaximizeWindow}>
                {iconWinDemaximize()}
              </button>
            ) : (
              <button className="hover:bg-gray-100 hover:bg-opacity-20 px-5" onClick={maximizeWindow}>
                {iconWinMaximize()}
              </button>
            )}
            <button className="hover:bg-red-500 hover:bg-opacity-20 px-5" onClick={closeWindow}>
              {iconWinClose()}
            </button>
          </div>
        </nav>

        <span
          onMouseDown={() => handleResizeClick('width')}
          id="win-resize-width"
          className="fixed w-2 opacity-60 cursor-w-resize"
          style={{
            top: `${winCoord.pointY}px`,
            left: `${winCoord.pointX + winWidth - 4}px`,
            height: `${winHeight}px`,
          }}
        ></span>
        <span
          onMouseDown={() => handleResizeClick('height')}
          id="win-resize-height"
          className="fixed h-2 opacity-60 cursor-s-resize"
          style={{
            top: `${winCoord.pointY + winHeight - 4}px`,
            left: `${winCoord.pointX}px`,
            width: `${winWidth}px`,
          }}
        ></span>
        <span
          onMouseDown={() => handleResizeClick('all')}
          id="win-resize-all"
          className="fixed h-3 w-3 opacity-60 cursor-se-resize z-10"
          style={{
            top: `${winCoord.pointY + winHeight - 8}px`,
            left: `${winCoord.pointX + winWidth - 8}px`,
          }}
        ></span>

        {children}
      </div>
    </>
  );
}
