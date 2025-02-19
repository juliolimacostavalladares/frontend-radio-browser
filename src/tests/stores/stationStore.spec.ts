import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useStationStore } from '@/stores/stationStore';
import type { Station } from '@/services/types';

describe('stationStore', () => {
  let store: ReturnType<typeof useStationStore>;

  const sampleStation: Station = {
    stationuuid: '1',
    name: 'Sample Station',
    url: 'http://samplestation.com',
    favicon: 'http://samplestation.com/favicon.ico',
    language: 'English',
    country: 'USA',
    tags: 'rock, pop',
    state: '',
    url_resolved: 'http://samplestation',
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useStationStore();
  });

  afterEach(() => {
    store.$reset();
  });

  it('inicializa com valores corretos', () => {
    expect(store.selected).toBe(null);
    expect(store.selectedEdit).toBe(null);
    expect(store.favorites).toEqual([]);
    expect(store.stations).toEqual([]);
  });

  it('seleciona uma estação', () => {
    store.selectStation(sampleStation);
    expect(store.selected).toEqual(sampleStation);
  });

  it('adiciona uma estação aos favoritos', () => {
    store.addFavorite(sampleStation);
    expect(
      store.favorites.some(
        (station) => station.stationuuid === sampleStation.stationuuid
      )
    ).toBe(true);
  });

  it('remove uma estação dos favoritos', () => {
    store.addFavorite(sampleStation);
    store.removeFavorite(sampleStation.stationuuid);
    expect(
      store.favorites.some(
        (station) => station.stationuuid === sampleStation.stationuuid
      )
    ).toBe(false);
  });

  it('edita o nome de uma estação favorita', () => {
    store.addFavorite(sampleStation);
    store.editStation('New Station Name', sampleStation.stationuuid);
    expect(
      store.favorites.find(
        (station) => station.stationuuid === sampleStation.stationuuid
      )?.name
    ).toBe('New Station Name');
  });
});
