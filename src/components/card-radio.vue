<template>
  <div
    class="cursor-pointer bg-[#191414a2] hover:bg-[#1f1a1aa2] w-full h-full flex flex-col gap-4 items-start justify-between p-6 max-w-[200px] rounded-lg"
  >
    <img
      @error="handleImageError"
      class="w-full h-auto rounded-lg shadow-[0px_8px_16px_-8px_rgba(25,20,20,0.80)]"
      :src="station.favicon"
      :alt="station.name"
    />

    <div class="w-full flex flex-col gap-6">
      <article class="text-white text-xs font-normal leading-[14px]">
        <div class="overflow-hidden">
          <div>
            <h1
              v-if="!isEditing"
              class="text-white pb-2 text-sm font-bold leading-none"
            >
              {{ station.name }}
            </h1>
            <input
              class="w-full text-2xl p-2 border-b"
              v-if="isEditing"
              :value="stationNameInputValue = station.name.trim()"
              @input="handleInput"
              @focusout="
                () => {
                  handleEdit(station);
                  isEditing = false;
                }
              "
              @keyup.enter="
                () => {
                  handleEdit(station);
                  isEditing = false;
                }
              "
            />
          </div>
          <p>{{ station.country }}</p>
          <p>{{ station.tags }}</p>
        </div>
      </article>
      <div class="w-full flex justify-between">
        <Trash
          @click="(e) => removeFavorite(e, station.stationuuid)"
          class="text-white cursor-pointer"
        />
        <Pencil
          @click="
            (e) => {
              e.preventDefault();
              isEditing = true;
            }
          "
          class="text-white cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pencil, Trash } from 'lucide-vue-next';
import fallbackImage from '@/assets/no-image.png';
import { useImageLoader } from '@/composables/useImageLoader';
import { useStations } from '@/composables/useStations';
import { useFavorites } from '@/composables/useFavorites';
import type { Station } from '@/services/types';

defineProps<{
  station: Station;
}>();

const { handleImageError } = useImageLoader(fallbackImage);
const { isEditing, handleInput, handleEdit, stationNameInputValue } =
  useStations();

const { removeFavorite } = useFavorites();
</script>
