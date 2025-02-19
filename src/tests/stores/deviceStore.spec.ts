import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDeviceStore } from '@/stores/deviceStore';
import { nextTick } from 'vue';

describe('deviceStore', () => {
  let store: ReturnType<typeof useDeviceStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    global.window.innerWidth = 1024;
    store = useDeviceStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('inicializa com valores corretos com base na largura da janela', () => {
    expect(store.isMobile).toBe(false);
    expect(store.showSidebar).toBe(true);
  });

  it('atualiza isMobile e showSidebar no redimensionamento da janela', async () => {
    global.window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(store.isMobile).toBe(false);
    expect(store.showSidebar).toBe(true);

    global.window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(store.isMobile).toBe(false);
    expect(store.showSidebar).toBe(true);
  });
});
