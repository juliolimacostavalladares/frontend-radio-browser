<template>
  <div class="flex bg-gray-100 min-h-screen">
    <div
      :class="[
        deviceStore.isMobile && 'w-full',
        'fixed w-72 top-0 left-0 mb-36 bg-black',
      ]"
    >
      <h1
        v-if="deviceStore.showSidebar"
        class="text-2xl text-white my-3 mx-10 font-bold leading-none"
      >
        Procure radios
      </h1>
      <side-bar v-if="deviceStore.showSidebar" />
    </div>

    <main
      :class="[
        className().spaceToPlayerSidebar,
        className().spaceToPlayerMain,
        'bg-[#121212] sm:ml-72 ml-0 w-full text-white p-5',
      ]"
    >
      <router-view />
    </main>

    <div class="fixed bottom-0 w-full">
      <audio-player
        v-if="stationsStore.selected"
        :station="stationsStore.selected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/side-bar.vue';
import AudioPlayer from '@/components/audio-player.vue';
import { useStationStore } from '@/stores/stationStore';
import { useDeviceStore } from './stores/deviceStore';
import { onMounted } from 'vue';

const stationsStore = useStationStore();
const deviceStore = useDeviceStore();

let css = {
  spaceToPlayerSidebar: 'pb-36',
  spaceToPlayerMain: '',
};

const className = () => {
  if (!stationsStore.selected) {
    css.spaceToPlayerSidebar = '';
  } else {
    css.spaceToPlayerMain = 'sm:mb-24 mb-24';
  }
  return css;
};
onMounted(() => {
  const favorites = localStorage.getItem('favorites');
  if (!favorites) localStorage.setItem('favorites', '[]');
});
</script>
