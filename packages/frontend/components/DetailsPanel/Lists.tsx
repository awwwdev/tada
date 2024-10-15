"use client";

import useTaskMutation from "@/hooks/useTaskMutation";
import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { List, Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import MenuItem from "../ui/MenuItem/MenuItem";

export default function Lists({ task }: { task: Task }) {
  const userMeQ = useUserMe();

  const listsQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS],
    queryFn: () => fetchAPI.GET(`/lists`),
    enabled: !!userMeQ.data?.id,
  });

  const lists = listsQ.data;
  // const listWithThisTask = useMemo(() => {
  //   if (!listsQ.data) return [];
  //   return listsQ.data.filter((l: List) => {
  //     return l.tasks?.some((t: { id: string }) => t.id === task.id);
  //   });
  // }, [listsQ.data, task]);

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const taskMutation = useTaskMutation();

  const [parentRef, enableAnimations] = useAutoAnimate(/* optional config */);

  return (
    <div className=" ">
      <div className="h-3"></div>
      <div>
        <ul className="" ref={parentRef}>
          <fieldset>
            <div className="flex gap-3 flex-wrap ">
              <legend className="H2 mie-auto">List</legend>
              <InputItem
                index={-1}
                list={{
                  id: "INVALID_ID",
                  name: "No list",
                  authorId: "INVALID_ID",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  tasks: [],
                }}
                checked={task.listId === null}
                onChange={(e) => {
                  taskMutation.mutate({
                    id: task.id,
                    listId: null,
                  });
                }}
              />

              {lists &&
                lists.length > 0 &&
                lists.map((list: List, index: number) => {
                  return (
                    <InputItem
                      key={`list-input-item-${index}`}
                      index={index}
                      list={list}
                      checked={list.id === task.listId}
                      onChange={(e) => {
                        taskMutation.mutate({
                          id: task.id,
                          listId: task.listId === list.id ? null : list.id,
                        });
                      }}
                    />
                  );
                })}
            </div>
          </fieldset>
        </ul>
      </div>
    </div>
  );
}

function InputItem({
  index,
  list,
  checked,
  onChange,
}: {
  index: number;
  list: List;
  checked: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <label htmlFor={`list-radio-item-${index}`} key={`list-item-${index}`}>
      <MenuItem className="flex gap-3 " size="lg" variant="soft">
        <div className="w-5 h-5 bg-base2 rounded-full flex justify-center items-center">
          {checked && <div className="w-3 h-3 bg-accent11 rounded-full"></div>}
        </div>
        <span>{list.name}</span>
        <input
          value={list.id}
          type="radio"
          name="list-radio-group"
          id={`list-radio-item-${index}`}
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
      </MenuItem>
    </label>
  );
}
