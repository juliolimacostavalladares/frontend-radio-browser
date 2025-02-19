import { ref } from 'vue';
import { useStationStore } from '@/stores/stationStore';
import type { Station } from '@/services/types';
import { fetchStations } from '@/services/radio';

export function useStations() {
  const stationsStore = useStationStore();
  const isEditing = ref(false);
  const stationNameInputValue = ref('');
  const stations = ref<Station[]>([]);

  const handleSelect = (station: Station) => {
    stationsStore.selected = station;
  };

  const handleSelected = (stationId: string) => {
    if (stationsStore.selected?.stationuuid === stationId) return true;
    else return false;
  };

  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    stationNameInputValue.value = input.value;
  };

  const handleEdit = (station: Station) => {
    stationsStore.selectedEdit = station;
    stationsStore.editStation(stationNameInputValue.value, station.stationuuid);
    isEditing.value = false;

    const favorites = JSON.parse(
      localStorage.getItem('favorites') as string
    ) as Station[];

    const stationToEdit = favorites.find(
      (stations) => stations.stationuuid === station.stationuuid
    );

    if (stationToEdit) {
      stationToEdit.name = stationNameInputValue.value;

      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  const loadStations = async (query?: string) => {
    try {
      const response = await fetchStations(query);
      stationsStore.stations = response;
      stations.value = stationsStore.stations;
    } catch (error) {
      console.error('Erro ao carregar as estações:', error);
    }
  };

  return {
    stations,
    isEditing,
    stationNameInputValue,
    handleInput,
    loadStations,
    handleSelect,
    handleSelected,
    handleEdit,
  };
}
