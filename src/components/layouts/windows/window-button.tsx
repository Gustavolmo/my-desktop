import { StoreApi, UseBoundStore } from 'zustand';
import { AppStore } from './window-app-types';

type StoreProp = {
  children: React.ReactNode;
  useAppStore: UseBoundStore<StoreApi<AppStore>>;
};

export default function WindowButton({ children, useAppStore }: StoreProp) {
  const { openWindow, minimizeWindow, isWinMinimized, winVisualState } = useAppStore();

  const handleOpenCloseWin = () => {
    if (isWinMinimized || winVisualState === 'closed') openWindow();
    else minimizeWindow();
  };

  return (
    <button onClick={handleOpenCloseWin} className="h-12 w-12 bg-gray-800 text-white rounded-lg">
      {children}
    </button>
  );
}
