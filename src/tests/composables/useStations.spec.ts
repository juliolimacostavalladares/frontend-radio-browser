import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStations } from '@/composables/useStations';
import { useStationStore } from '@/stores/stationStore';
import type { Station } from '@/services/types';
import { fetchStations } from '@/services/radio';

vi.mock('@/stores/stationStore');
vi.mock('@/services/radio');

describe('useStations', () => {
  let stationsStore: any;
  let stationsComposable: ReturnType<typeof useStations>;

  const mockStation: Station = {
    stationuuid: '123',
    name: 'Test Station',
    url: 'http://test.url',
    tags: 'test',
    country: 'Test Country',
    favicon: '',
    language: '',
    state: '',
    url_resolved: '',
  };

  beforeEach(() => {
    stationsStore = {
      selected: null,
      selectedEdit: null,
      stations: [],
      editStation: vi.fn(),
    };
    (useStationStore as any).mockReturnValue(stationsStore);

    localStorage.clear();
    stationsComposable = useStations();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with the correct values', () => {
    expect(stationsComposable.stations.value).toEqual([]);
    expect(stationsComposable.isEditing.value).toBe(false);
    expect(stationsComposable.stationNameInputValue.value).toBe('');
  });

  it('handles station selection', () => {
    stationsComposable.handleSelect(mockStation);
    expect(stationsStore.selected).toBe(mockStation);
  });

  it('checks if a station is selected', () => {
    stationsStore.selected = mockStation;
    const isSelected = stationsComposable.handleSelected('123');
    expect(isSelected).toBe(true);
  });

  it('handles input changes', () => {
    const event = {
      target: { value: 'New Station Name' },
    } as unknown as Event;
    stationsComposable.handleInput(event);
    expect(stationsComposable.stationNameInputValue.value).toBe(
      'New Station Name'
    );
  });

  it('edits a station name', () => {
    const favorites = [mockStation];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    stationsComposable.stationNameInputValue.value = 'New Station Name';
    stationsComposable.handleEdit(mockStation);

    expect(stationsStore.editStation).toHaveBeenCalledWith(
      'New Station Name',
      '123'
    );
    expect(stationsComposable.isEditing.value).toBe(false);

    const updatedFavorites = JSON.parse(
      localStorage.getItem('favorites') as string
    );
    expect(updatedFavorites[0].name).toBe('New Station Name');
  });

  it('loads stations', async () => {
    const mockResponse = [mockStation];
    (fetchStations as any).mockResolvedValue(mockResponse);

    await stationsComposable.loadStations();

    expect(fetchStations).toHaveBeenCalled();
    expect(stationsStore.stations).toStrictEqual(mockResponse);
    expect(stationsComposable.stations.value).toStrictEqual(mockResponse);
  });

  it('handles errors when loading stations', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (fetchStations as any).mockRejectedValue(
      new Error('Erro ao carregar as estações')
    );

    await stationsComposable.loadStations();

    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Erro ao carregar as estações:',
      expect.any(Error)
    );
    consoleErrorMock.mockRestore();
  });
});
