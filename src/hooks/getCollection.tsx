import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../services/CollectionCardService';
import { fetchSeries } from '../services/CollectionSeriesService';
import { fetchSets } from '../services/CollectionSetService';
import { CollectionCard } from '../types/CollectionCard';
import { SeriesAndSet, SetAndCard } from '../types/MergedCollection';

export const getSeries = () => {
    return useQuery<SeriesAndSet[]>({
        queryKey: ['SeriesList'],
        queryFn: fetchSeries,
        staleTime: 1000 * 60 * 5,
      });
}

export const getSets = (seriesShortName?: string) => {
  return useQuery<SetAndCard[]>({
      queryKey: ['SetsList'],
      enabled: !!seriesShortName,
      queryFn: () => fetchSets(seriesShortName!),
      staleTime: 1000 * 60 * 5,
    });
}

export const getCards = (setShortName?: string) => {
  return useQuery<CollectionCard[]>({
      queryKey: ['SetsList'],
      enabled: !!setShortName,
      queryFn: () => fetchCards(setShortName!),
      staleTime: 1000 * 60 * 5,
    });
}
