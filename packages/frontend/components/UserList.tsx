"use client";

import type { List as ListType, Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

import UserListDropDown from "./UserListDropDown";
import List from "./List";

export default function UserList({ listId }: { listId: string }) {
  const tasksQ = useQuery<Task[]>({
    queryKey: ["tasks", "lists", "user-list", listId],
    queryFn: () => fetchAPI.GET(`/tasks?listId=${listId}`),
  });

  const listQ = useQuery<ListType>({
    queryKey: ["lists", listId],
    queryFn: () => fetchAPI.GET(`/lists/${listId}`),
  });

  return (
    <List
      tasks={tasksQ.data ?? []}
      listName={listQ.data?.name ?? ""}
      listControls={<UserListDropDown listId={listId} />}
    />
  );
}