<template>
  <div class="flex flex-col gap-6">
    <div class="mx-10 mb-3">
      <search-bar @search-favorites="handleSearchFavorites" />
    </div>
    <station-list
      v-if="stations.favorites.length > 0"
      :stations="stations.favorites"
    />
    <div class="flex flex-col justify-center items-center" v-else>
      <h1 class="text-4xl text-white my-3 mx-10 font-bold leading-none">
        Sem radios favoritas
      </h1>
      <HeartOffIcon :size="200" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/search-bar.vue';
import StationList from '@/components/station-list.vue';
import { useFavorites } from '@/composables/useFavorites';
import type { Station } from '@/services/types';
import { useStationStore } from '@/stores/stationStore';
import { HeartOffIcon } from 'lucide-vue-next';
import { onMounted } from 'vue';

const stations = useStationStore();
const { filterFavorites } = useFavorites();

const handleSearchFavorites = (searchTerm: string) => {
  filterFavorites(searchTerm);
};

onMounted(() => {
  stations.favorites = JSON.parse(
    localStorage.getItem('favorites') as string
  ) as Station[];
});
</script>
