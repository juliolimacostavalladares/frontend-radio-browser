import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { useStationStore } from '@/stores/stationStore';

vi.mock('@/stores/stationStore');

describe('useAudioPlayer', () => {
  let stationsStore: any;
  let audioMock: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    stationsStore = {
      selected: ref({ url: 'http://new-stream-url' }),
    };
    (useStationStore as any).mockReturnValue(stationsStore);

    audioMock = {
      play: vi.fn(() => Promise.resolve()),
      pause: vi.fn(),
      load: vi.fn(),
      currentTime: 0,
      _src: 'http://new-stream-url',
      set src(url: string) {
        this._src = url;
      },
      get src() {
        return this._src;
      },
    };
    global.Audio = vi.fn(() => audioMock);

    vi.useFakeTimers();
  });

  it('initializes with the correct values', () => {
    const { isPlaying } = useAudioPlayer();
    expect(isPlaying.value).toBe(false);
    expect(audioMock.src).toBe('http://new-stream-url');
  });

  it('plays audio when play is called', async () => {
    const { togglePlayPause, isPlaying } = useAudioPlayer();
    togglePlayPause();
    await vi.runAllTimers();
    expect(audioMock.play).toHaveBeenCalled();
    expect(isPlaying.value).toBe(true);
  });

  it('pauses audio when pause is called', async () => {
    const { togglePlayPause, isPlaying } = useAudioPlayer();
    togglePlayPause();
    await vi.runAllTimers();
    togglePlayPause();
    expect(audioMock.pause).toHaveBeenCalled();
    expect(isPlaying.value).toBe(false);
  });

  it('skips audio when skip is called', () => {
    const { skip } = useAudioPlayer();
    skip(10);
    expect(audioMock.currentTime).toBe(10);
  });
});
