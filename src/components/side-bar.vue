<template>
  <div
    :class="[
      stationsStore.selected?.stationuuid && 'pb-60',
      'w-full flex h-svh flex-col justify-between items-start p-3',
    ]"
  >
    <div
      :class="[
        deviceStore.isMobile && 'w-full',
        'px-4 py-2 overflow-auto custom-scroll',
      ]"
    >
      <div class="w-full p-2">
        <SearchBar @search-side-bar="handleInput" />
      </div>
      <div
        v-for="station in stations"
        :key="station.stationuuid"
        :class="[
          'cursor-pointer flex items-center justify-between p-2 my-2 rounded hover:bg-gray-800',
          { 'bg-gray-800': handleSelected(station.stationuuid) },
        ]"
        @click="() => handleSelect(station)"
      >
        <div class="flex justify-start gap-4 p-2 overflow-hidden">
          <Radio
            :class="{
              'text-white': !handleSelected(station.stationuuid),
              'text-red-600': handleSelected(station.stationuuid),
            }"
          />
          <span class="text-gray-400 text-sm font-bold max-w-32 truncate">
            {{ station.name }}
          </span>
        </div>
        <button
          class="cursor-pointer text-white"
          @click="(e) => addFavorite(e, station)"
        >
          <Heart />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Radio, Heart } from 'lucide-vue-next';
import { useSearch } from '@/composables/useSearch';
import { useDeviceStore } from '@/stores/deviceStore';
import SearchBar from '@/components/search-bar.vue';
import { useStations } from '@/composables/useStations';
import { onMounted } from 'vue';
import { useFavorites } from '@/composables/useFavorites';
import { useStationStore } from '@/stores/stationStore';

const deviceStore = useDeviceStore();
const stationsStore = useStationStore();

const { searchQuery } = useSearch();
const { addFavorite } = useFavorites();
const { handleSelect, handleSelected, loadStations, stations } = useStations();

const handleInput = async (query: string) => {
  searchQuery.value = query;
  await loadStations(query);
};

onMounted(async () => {
  await loadStations();
});
</script>
