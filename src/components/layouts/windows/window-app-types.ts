import { RefObject } from 'react';

export type WindowStates = 'closed' | 'maximized' | 'demaximized';
export type Coord = { pointX: number; pointY: number };
export type ResizeState = false | 'height' | 'width' | 'all';

export type AppStore = {
  /* Owner window */
  ownerWindow: RefObject<HTMLDivElement | null> | undefined;
  setOwnerWindow: (ref: RefObject<HTMLDivElement | null>) => void;

  /* State handlers */
  winVisualState: WindowStates;
  setWinVisualState: (newState: WindowStates) => void;

  isWinMinimized: boolean;
  setIsWinMinimized: (isMini: boolean) => void;

  dragClickOffset: Coord;
  setDragClickOffset: (newCoord: Coord) => void;

  isDragging: boolean;
  setIsDragging: (updatedIsDragging: boolean) => void;

  winCoord: Coord;
  setWinCoord: (newWinCoord: Coord) => void;

  isResizing: ResizeState;
  setIsResizing: (updatedIsResizing: ResizeState) => void;

  winWidth: number;
  setWinWidth: (newWinWidth: number) => void;

  winHeight: number;
  setWinHeight: (newWinHeight: number) => void;

  /* Logic handlers */
  stopDragAndResize: () => void;

  openWindow: () => void;
  closeWindow: () => void;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  demaximizeWindow: () => void;
};
