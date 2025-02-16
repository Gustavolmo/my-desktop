import { AppStore } from '@/components/layouts/windows/window-app-types';
import WindowLayout from '@/components/layouts/windows/window-layout';
import { StoreApi, UseBoundStore } from 'zustand';

type PropStore = {
  store: UseBoundStore<StoreApi<AppStore>>;
};

export default function AboutMeApp({ store }: PropStore) {
  return (
    <WindowLayout useAppStore={store}>
      <div>HELLO WORLD</div>
      <div>I am the window content</div>
    </WindowLayout>
  );
}
