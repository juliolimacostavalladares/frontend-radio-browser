import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '@/components/search-bar.vue';
import { Menu, SquareMenu } from 'lucide-vue-next';
import { useDeviceStore } from '@/stores/deviceStore';
import { useSearch } from '@/composables/useSearch';

vi.mock('@/stores/deviceStore');
vi.mock('@/composables/useSearch');

describe('SearchBar.vue', () => {
  let deviceStore: any;
  let searchQuery: string;
  let emitSearch: any;

  beforeEach(() => {
    deviceStore = {
      isMobile: false,
      showSidebar: false,
    };

    searchQuery = '';
    emitSearch = vi.fn((callback: Function) => {
      callback('search-side-bar', searchQuery);
    });

    (useDeviceStore as any).mockReturnValue(deviceStore);
    (useSearch as any).mockReturnValue({ searchQuery, emitSearch });
  });

  it('renders input element with correct placeholder', () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Buscar rádios');
  });

  it('toggles sidebar visibility on button click when isMobile is true', async () => {
    deviceStore.isMobile = true;
    const wrapper = mount(SearchBar);

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(deviceStore.showSidebar).toBe(true);

    await button.trigger('click');
    expect(deviceStore.showSidebar).toBe(false);
  });

  it('emits search events correctly on input', async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    await input.setValue('Radio Test');
    await input.trigger('input');

    expect(emitSearch).toHaveBeenCalled();
    expect(emitSearch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('renders Menu icon when sidebar is hidden and SquareMenu icon when sidebar is visible', async () => {
    deviceStore.isMobile = true;
    const wrapper = mount(SearchBar);

    expect(wrapper.findComponent(Menu).exists()).toBe(true);
    expect(wrapper.findComponent(SquareMenu).exists()).toBe(false);

    deviceStore.showSidebar = true;
    await wrapper.vm.$forceUpdate();

    expect(wrapper.findComponent(Menu).exists()).toBe(false);
    expect(wrapper.findComponent(SquareMenu).exists()).toBe(true);
  });
});
