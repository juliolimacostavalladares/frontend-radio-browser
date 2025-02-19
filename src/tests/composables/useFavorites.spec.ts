import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavorites } from '@/composables/useFavorites';
import { useStationStore } from '@/stores/stationStore';
import type { Station } from '@/services/types';

vi.mock('@/stores/stationStore');

describe('useFavorites', () => {
  let stationsStore: any;
  let favoritesComposable: ReturnType<typeof useFavorites>;

  const mockStation: Station = {
    stationuuid: '123',
    name: 'Test Station',
    url: 'http://test.url',
    tags: 'test',
    country: 'Test Country',
    favicon: '',
    language: '',
    state: '',
    url_resolved: '',
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    stationsStore = {
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    };
    (useStationStore as any).mockReturnValue(stationsStore);

    localStorage.clear();
    favoritesComposable = useFavorites();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('adds a favorite station', () => {
    const event = new Event('click');
    favoritesComposable.addFavorite(event, mockStation);

    expect(stationsStore.addFavorite).toHaveBeenCalledWith(mockStation);
    expect(JSON.parse(localStorage.getItem('favorites') as string)).toEqual([
      mockStation,
    ]);
  });

  it('does not add a station that is already a favorite', () => {
    const event = new Event('click');
    localStorage.setItem('favorites', JSON.stringify([mockStation]));
    favoritesComposable.addFavorite(event, mockStation);

    expect(stationsStore.addFavorite).not.toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem('favorites') as string)).toEqual([
      mockStation,
    ]);
  });

  it('removes a favorite station', () => {
    const event = new Event('click');
    localStorage.setItem('favorites', JSON.stringify([mockStation]));
    favoritesComposable.removeFavorite(event, '123');

    expect(stationsStore.removeFavorite).toHaveBeenCalledWith('123');
    expect(JSON.parse(localStorage.getItem('favorites') as string)).toEqual([]);
  });

  it('filters favorites by query', () => {
    localStorage.setItem('favorites', JSON.stringify([mockStation]));
    favoritesComposable.filterFavorites('Test');

    expect(stationsStore.favorites).toEqual([mockStation]);
  });

  it('does not filter out favorites if no match', () => {
    localStorage.setItem('favorites', JSON.stringify([mockStation]));
    favoritesComposable.filterFavorites('Nonexistent');

    expect(stationsStore.favorites).toEqual([]);
  });
});
