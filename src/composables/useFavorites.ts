import type { Station } from '@/services/types';
import { useStationStore } from '@/stores/stationStore';

export const useFavorites = () => {
  const stationsStore = useStationStore();

  const checkFavoriteInLocalStorage = (station: Station): boolean => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(
      (fav: Station) => fav.stationuuid === station.stationuuid
    );
  };

  const addFavorite = (event: Event, station: Station) => {
    event.stopPropagation();

    const isCurrentlyFavorite = checkFavoriteInLocalStorage(station);

    if (!isCurrentlyFavorite) {
      stationsStore.addFavorite(station);
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites.push(station);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  const removeFavorite = (event: Event, stationId: string) => {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    favorites = favorites.filter(
      (fav: Station) => fav.stationuuid !== stationId
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));
    stationsStore.removeFavorite(stationId);
  };

  const filterFavorites = (query: string) => {
    const filteredStations = JSON.parse(
      localStorage.getItem('favorites') as string
    ) as Station[];

    stationsStore.favorites = filteredStations.filter((station: Station) => {
      const searchQuery = query.toLowerCase();
      return (
        station.name.toLowerCase().includes(searchQuery) ||
        station.tags.toLowerCase().includes(searchQuery) ||
        station.country.toLowerCase().includes(searchQuery)
      );
    });
  };

  return {
    addFavorite,
    filterFavorites,
    removeFavorite,
  };
};
