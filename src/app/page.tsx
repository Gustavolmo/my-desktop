'use client';

import AppsContainer from '@/components/layouts/apps-container/apps-container';
import GlobalAppListeners from '@/components/client-init/global-listeners';
import WindowButton from '@/components/layouts/windows/window-button';
import WindowLayout from '@/components/layouts/windows/window-layout';
import { useAboutMeState } from '@/components/window-pages/about-me/aboute-me-store';

export default function Home() {
  const { stopDragAndResize } = useAboutMeState();

  const stopAllDragAndResize = () => {
    stopDragAndResize();
  };

  return (
    <>
      <GlobalAppListeners />
      <div className="absolute h-full w-full polka-dot-background" />

      <main onMouseLeave={stopAllDragAndResize} className="absolute flex flex-col h-full w-full">
        <WindowLayout useAppStore={useAboutMeState}>
          <div>HELLO WORLD</div>
          <div>I am the window content</div>
        </WindowLayout>
      </main>

      <AppsContainer>
        <WindowButton useAppStore={useAboutMeState}>ME</WindowButton>
      </AppsContainer>
    </>
  );
}
