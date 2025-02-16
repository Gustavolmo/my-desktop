'use client';

import AppsContainer from '@/components/layouts/apps-container/apps-container';
import GlobalAppListeners from '@/components/client-init/global-listeners';
import WindowButton from '@/components/layouts/windows/window-button';
import { createWindowStore } from '@/components/layouts/windows/window-store-factory';
import AboutMeApp from '@/components/window-pages/about-me/about-me';
import WindowLayout from '@/components/layouts/windows/window-layout';

const aboutMeStore = createWindowStore();
const testStore1 = createWindowStore();
const testStore2 = createWindowStore();

export default function Home() {
  const { stopDragAndResize } = aboutMeStore();

  const stopAllDragAndResize = () => {
    stopDragAndResize();
  };

  return (
    <>
      <GlobalAppListeners />
      <div className="absolute h-full w-full polka-dot-background" />

      <main onMouseLeave={stopAllDragAndResize} className="absolute flex flex-col h-full w-full">
        <AboutMeApp store={aboutMeStore} />

        {/* GUTAVO: Use those test windows to see how to hanlde z-index */}
        <WindowLayout useAppStore={testStore1}>
          <div>TEST 1</div>
        </WindowLayout>

        <WindowLayout useAppStore={testStore2}>
          <div>TEST 2</div>
        </WindowLayout>
        {/* _________________________________________________________end_ */}
      </main>

      <AppsContainer>
        <WindowButton useAppStore={aboutMeStore}>ME</WindowButton>
        <WindowButton useAppStore={testStore1}>1</WindowButton>
        <WindowButton useAppStore={testStore2}>2</WindowButton>
      </AppsContainer>
    </>
  );
}
