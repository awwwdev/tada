"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useGlobalContext } from "@/components/Provider";
import UserListDropDown from "@/components/UserListDropDown";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useUserMe from "@/hooks/useUserMe";
import { List } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddUserListButton from './AddUserListButton';

export default function UserLists() {
  const userMeQ = useUserMe();
  const { setSelectedUserListId } = useGlobalContext();
  const listQ = useQuery({
    queryKey: ["lists"],
    queryFn: () => fetchAPI.GET("/lists"),
    enabled: !!userMeQ.data?.id,
  });

  const queryClient = useQueryClient();

  const deleteListM = useMutation({
    mutationFn: (id: string) => fetchAPI.DELETE(`/lists/${id}`),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
  const { setListsPanelOpen } = useGlobalContext();

  return (
    <>
      <div className="flex gap-3 justify-between items-center">
        <span className="c-base10 pis-3 ">My Lists</span>
        <AddUserListButton />
      </div>

      {listQ.isLoading && <LoadingSpinner />}
      <ul>
        {listQ.data &&
          listQ.data.length > 0 &&
          listQ.data.map((list: List, index: number) => {
            return (
              <li key={"menu-item-list-" + index} className="flex gap-3 items-center pis-3 hover:bg-base4 rd-1.5">
                <Button
                  variant="text"
                  preStyled={false}
                  className="!text-start w-full"
                  onClick={() => {
                    setSelectedUserListId(list.id);
                    setListsPanelOpen(false);
                  }}
                >
                  <Icon name="bf-i-ph-list" className="c-base11 mie-1.5" />
                  <span className="grow">{list.name}</span>
                </Button>
                <UserListDropDown listId={list.id} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
