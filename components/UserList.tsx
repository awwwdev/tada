"use client";

import type { List as ListType, Task, ListTask } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UserListDropDown from "./UserListDropDown";
import List from "./List";
import { listHues } from "@/constants/listHues";
import useList from "@/hooks/useList";
// import useList from "@/hooks/useList";

export default function UserList({ listId }: { listId: string }) {
  const listQ = useList({ listId });

  function calculateNewOrderValue(reorderedTasks: Task[], oldOrderedTasks: Task[], movedTaskId: string) {
    const indexTaskMovedTo = reorderedTasks.findIndex((item, index) => item.id === movedTaskId);
    const movedTask = reorderedTasks[indexTaskMovedTo];

    if (indexTaskMovedTo === 0) {
      const orderOfFirstTask = listQ.data?.tasks.find((t) => t.taskId === oldOrderedTasks[0].id)?.orderInList;
      return { movedTaskId: movedTask.id, newOrderValue: (1000 * Number(orderOfFirstTask)) / 1001 };
    }
    if (indexTaskMovedTo === reorderedTasks.length - 1) {
      const orderOfLastTask = listQ.data?.tasks.find(
        (t) => t.taskId === oldOrderedTasks[oldOrderedTasks.length - 1].id
      )?.orderInList;
      return { movedTaskId: movedTask.id, newOrderValue: Number(orderOfLastTask) + 2 };
    }

    const orderOfTaskAfter = listQ.data?.tasks.find(
      (t) => t.taskId === reorderedTasks[indexTaskMovedTo + 1].id
    )?.orderInList;

    const orderOfTaskBefore = listQ.data?.tasks.find(
      (t) => t.taskId === reorderedTasks[indexTaskMovedTo - 1].id
    )?.orderInList;

    return {
      movedTaskId: movedTask.id,
      newOrderValue: (1000 * Number(orderOfTaskAfter) + Number(orderOfTaskBefore)) / 1001,
    };
  }

  // queryClient.get

  const reorderItemMutation = useMutation({
    mutationFn: ({ taskId, listId, orderInList }: { taskId: string; listId: string; orderInList: string }) => {
      return fetchAPI.PATCH(`/lists/${listId}/reorder-task/${taskId}`, { orderInList });
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", "lists", listId] });
      const previousList = queryClient.getQueryData<Task[]>(["tasks", "lists", listId]);

      queryClient.setQueryData(["tasks", "lists", listId], (listWithTasks: ListWithTasks) => {
        const tasks = listWithTasks.tasks;
        const newTasks = tasks.map((task) => {
          if (task.id === variables.taskId) {
            return { ...task, orderInList: variables.orderInList };
          }
          return task;
        });
        return { ...listWithTasks, tasks: newTasks };
      });
      return { previousList };
    },
    onError: (err, newTasks, context) => {
      queryClient.setQueryData(["tasks", "lists", listId], context?.previousList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "lists", listId] });
    },
  });

  function handleReorder(reorderedTasks: Task[], oldOrderTasks: Task[], movedTaskId: string) {
    // find the item moved
    const { newOrderValue } = calculateNewOrderValue(reorderedTasks, oldOrderTasks, movedTaskId);
    reorderItemMutation.mutate({
      taskId: movedTaskId,
      listId,
      orderInList: String(newOrderValue),
    });
    // find the orderInList of before
    // find the orderInList of after
    // update the orderInList of the moved item to avg(before, after)
  }

  const queryClient = useQueryClient();

  type ListTaskWithTask = ListTask & { task: Task };
  type ListWithTasks = ListType & { tasks: ListTaskWithTask[] };

  const listHue = listQ.data?.theme?.hue;

  return (
    <List
      colorClassName={listHue ? listHues[listHue] : ""}
      tasks={listQ.data?.tasks.map((t) => t.task) ?? []}
      listName={listQ.data?.name ?? ""}
      listControls={<UserListDropDown listId={listId} />}
      handleReorder={handleReorder}
      setTasks={(newTasks: Task[]) => {
        queryClient.setQueryData(["tasks", "lists", listId], (listWithTasks: ListWithTasks) => {
          const newListTasks = newTasks.map((task) => {
            const listTask = listQ.data?.tasks.find((t) => t.taskId === task.id);
            return listTask;
          });
          return { ...listQ.data, tasks: newListTasks };
        });
      }}
    />
  );
}
