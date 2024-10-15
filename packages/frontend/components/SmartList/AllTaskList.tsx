"use client";

import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import List from '../List';

export default function AllTasksList() {
  const allTasksQ = useQuery<Task[], Error>({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: () => fetchAPI.GET(`/tasks`),
  });
  return <List tasks={allTasksQ.data ?? []} listName={"All Tasks"} />;
}


