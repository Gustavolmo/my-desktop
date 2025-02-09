import AppsContainer from '@/components/apps-container/apps-container';
import GlobalAppListeners from '@/components/client-init/global-listeners';
import AppWindow from '@/components/windows/window';

export default function Home() {
  return (
    <>
      {/* GUSTAVO: Global mouse up listener to stop dragging */}
      <GlobalAppListeners />
      <div className="absolute h-full w-full polka-dot-background" />

      <main className="absolute flex flex-col h-full w-full">
        <AppWindow />
        {/* <AppWindow /> */}
      </main>

      <AppsContainer>
        <button className="h-12 w-12 bg-gray-800 text-white rounded-lg">1</button>
        <button className="h-12 w-12 bg-gray-800 text-white rounded-lg">2</button>
      </AppsContainer>
    </>
  );
}
