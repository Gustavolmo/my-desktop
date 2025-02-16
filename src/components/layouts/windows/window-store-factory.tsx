'use client';

import { create } from 'zustand';
import { RefObject } from 'react';
import {
  AppStore,
  Coord,
  ResizeState,
  WindowStates,
} from '@/components/layouts/windows/window-app-types';

export const createWindowStore = () =>
  create<AppStore>((set, get) => ({
    ownerWindow: undefined,
    setOwnerWindow: (ref: RefObject<HTMLDivElement | null>) => set({ ownerWindow: ref }),

    winVisualState: 'closed',
    setWinVisualState: (newState: WindowStates) => set({ winVisualState: newState }),

    isWinMinimized: false,
    setIsWinMinimized: (isMini: boolean) => set({ isWinMinimized: isMini }),

    dragClickOffset: { pointX: 0, pointY: 0 },
    setDragClickOffset: (newCoord: Coord) =>
      set({ dragClickOffset: { pointX: newCoord.pointX, pointY: newCoord.pointY } }),

    isDragging: false,
    setIsDragging: (updatedIsDragging: boolean) => set({ isDragging: updatedIsDragging }),

    winCoord: { pointX: 0, pointY: 0 },
    setWinCoord: (newWinCoord: Coord) =>
      set({ winCoord: { pointX: newWinCoord.pointX, pointY: newWinCoord.pointY } }),

    isResizing: false,
    setIsResizing: (updatedIsResizing: ResizeState) => set({ isResizing: updatedIsResizing }),

    winWidth: window.innerWidth,
    setWinWidth: (newWinWidth: number) => set({ winWidth: newWinWidth }),

    winHeight: window.innerHeight - 64,
    setWinHeight: (newWinHeight: number) => set({ winHeight: newWinHeight }),

    stopDragAndResize: () => set({ isDragging: false, isResizing: false }),

    closeWindow: () => set({ winVisualState: 'closed' }),
    minimizeWindow: () => set({ isWinMinimized: true }),
    maximizeWindow: () => {
      set({
        winCoord: { pointX: 0, pointY: 0 },
        winHeight: window.innerHeight - 64,
        winWidth: window.innerWidth,
        winVisualState: 'maximized',
      });
    },
    demaximizeWindow: () => {
      set({
        winCoord: { pointX: 40, pointY: 40 },
        winWidth: window.innerWidth * 0.95,
        winHeight: window.innerHeight * 0.75,
        winVisualState: 'demaximized',
      });
    },
    openWindow: () => {
      if (get().winVisualState === 'closed') {
        get().maximizeWindow();
      }

      const winRef = get().ownerWindow;
      if (get().isWinMinimized && winRef?.current) {
        set({ isWinMinimized: false });
        winRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    },
  }));
