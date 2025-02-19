import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SideBar from '@/components/side-bar.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useSearch } from '@/composables/useSearch';
import { useStations } from '@/composables/useStations';
import { useFavorites } from '@/composables/useFavorites';
import { useStationStore } from '@/stores/stationStore';
import SearchBar from '@/components/search-bar.vue';
import type { Station } from '@/services/types';

vi.mock('@/stores/deviceStore');
vi.mock('@/composables/useSearch');
vi.mock('@/composables/useStations');
vi.mock('@/composables/useFavorites');
vi.mock('@/stores/stationStore');

describe('SideBar.vue', () => {
  interface DeviceStore {
    isMobile: boolean;
  }

  interface StationStore {
    selected: Station | null;
  }

  interface SearchQuery {
    value: string;
  }

  type AddFavorite = (e: Event, station: Station) => void;
  type HandleSelect = (station: Station) => void;
  type HandleSelected = (stationuuid: string) => boolean;
  type LoadStations = (query?: string) => Promise<void>;

  let deviceStore: DeviceStore;
  let stationsStore: StationStore;
  let searchQuery: SearchQuery;
  let addFavorite: AddFavorite;
  let handleSelect: HandleSelect;
  let handleSelected: HandleSelected;
  let loadStations: LoadStations;
  let stations: Station[];

  beforeEach(() => {
    deviceStore = {
      isMobile: false,
    };

    stationsStore = {
      selected: null,
    };

    searchQuery = {
      value: '',
    };

    addFavorite = vi.fn();
    handleSelect = vi.fn();
    handleSelected = vi.fn().mockReturnValue(false);
    loadStations = vi.fn();
    stations = [
      {
        stationuuid: '1',
        name: 'Station 1',
        url: '',
        url_resolved: '',
        favicon: '',
        tags: '',
        country: '',
        state: '',
        language: '',
      },
      {
        stationuuid: '2',
        name: 'Station 2',
        url: '',
        url_resolved: '',
        favicon: '',
        tags: '',
        country: '',
        state: '',
        language: '',
      },
    ];

    (useDeviceStore as any).mockReturnValue(deviceStore);
    (useStationStore as any).mockReturnValue(stationsStore);
    (useSearch as any).mockReturnValue({ searchQuery });
    (useFavorites as any).mockReturnValue({ addFavorite });
    (useStations as any).mockReturnValue({
      handleSelect,
      handleSelected,
      loadStations,
      stations,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders SearchBar component', () => {
    const wrapper = mount(SideBar);
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
  });

  it('calls loadStations on mount', () => {
    mount(SideBar);
    expect(loadStations).toHaveBeenCalled();
  });

  it('renders the list of stations', () => {
    const wrapper = mount(SideBar);
    const stationElements = wrapper.findAll(
      '.cursor-pointer.flex.items-center.justify-between.p-2.my-2.rounded.hover\\:bg-gray-800'
    );
    expect(stationElements.length).toBe(stations.length);
  });

  it('calls handleSelect when a station is clicked', async () => {
    const wrapper = mount(SideBar);
    const stationElement = wrapper
      .findAll(
        '.cursor-pointer.flex.items-center.justify-between.p-2.my-2.rounded.hover\\:bg-gray-800'
      )
      .at(0);
    if (stationElement) {
      await stationElement.trigger('click');
      expect(handleSelect).toHaveBeenCalledWith(stations[0]);
    }
  });

  it('calls addFavorite when the favorite button is clicked', async () => {
    const wrapper = mount(SideBar);
    const favoriteButtons = wrapper.findAll('button');
    const favoriteButton = favoriteButtons.at(favoriteButtons.length - 1);
    if (favoriteButton) {
      await favoriteButton.trigger('click');
      expect(addFavorite).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        stations[1]
      );
    }
  });

  it('updates searchQuery and calls loadStations on search input', async () => {
    const wrapper = mount(SideBar);
    const searchBar = wrapper.findComponent(SearchBar);
    await searchBar.vm.$emit('search-side-bar', 'Jazz');
    expect(searchQuery.value).toBe('Jazz');
    expect(loadStations).toHaveBeenCalledWith('Jazz');
  });
});
