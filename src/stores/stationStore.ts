import { defineStore } from 'pinia';
import type { Station } from '@/services/types';

export const useStationStore = defineStore('station', {
  state: () => ({
    selected: null as Station | null,
    selectedEdit: null as Station | null,
    favorites: [] as Station[],
    stations: [] as Station[],
  }),
  actions: {
    selectStation(station: Station) {
      this.selected = station;
    },
    addFavorite(station: Station) {
      this.favorites.push(station);
    },
    removeFavorite(stationId: string) {
      this.favorites = this.favorites.filter(
        (station) => station.stationuuid !== stationId
      );
    },
    editStation(name: string, stationId: string) {
      const station = this.favorites.find(
        (station) => station.stationuuid === stationId
      );
      if (station) {
        station.name = name;
      }
    },
  },
});
