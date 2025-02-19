<template>
  <ul class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <li
      v-for="station in stations"
      :key="station.stationuuid"
      class="place-items-center mb-4"
    >
      <card-radio @click="() => handleSelect(station)" :station="station" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import CardRadio from '@/components/card-radio.vue';
import { useStations } from '@/composables/useStations';
import type { Station } from '@/services/types';

defineProps<{
  stations: Station[];
}>();

const { handleSelect } = useStations();
</script>
