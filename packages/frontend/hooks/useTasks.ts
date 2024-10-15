import QUERY_KEYS from '@/react-query/queryKeys';
import { Task } from '@/types';
import fetchAPI from '@/utils/fetchAPI';
import { useQuery } from '@tanstack/react-query';

type Args = {
  select?: (data: Task[]) => Task[]
} | undefined;

export default function useTasks(args?: Args) {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: () => fetchAPI.GET(`/tasks`),
    select: (data: Task[]) =>  args?.select?.(data)
  });
}