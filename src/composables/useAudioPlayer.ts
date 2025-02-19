import { useStationStore } from '@/stores/stationStore';
import { onMounted, ref, watch } from 'vue';

export function useAudioPlayer() {
  const stationsStore = useStationStore();
  const audio = ref(new Audio(stationsStore.selected?.url || ''));
  const isPlaying = ref(false);

  const play = () => {
    audio.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });
  };

  const pause = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  const togglePlayPause = () => {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
  };

  const skip = (seconds: number) => {
    audio.value.currentTime += seconds;
  };

  watch(
    () => stationsStore.selected,
    (newStation) => {
      console.log('newStation', newStation?.url);
      if (newStation?.url) {
        audio.value.src = newStation.url;
        audio.value.load();
        if (isPlaying.value) {
          play();
        }
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    play();
  });

  return {
    isPlaying,
    togglePlayPause,
    skip,
  };
}
