"use client";

import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import useDeleteList from "@/hooks/useDeleteList";
import useListMutation from "@/hooks/useListMutation";
import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { DropdownMenu, DropdownMenuItem } from "./ui/DropdownMenu";
import Input from "./ui/Input";
import LoadingSpinner from "./ui/LoadingSpinner";
import Modal from "./ui/modal";

export default function UserListDropDown({ listId }: { listId: string }) {
  const userMeQ = useUserMe();
  const listQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS, listId],
    queryFn: async () => fetchAPI.GET(`/lists/${listId}`),
  });

  const listName = listQ.data?.name;

  const [listNameValue, setListNameValue] = useState<string>(listName ?? "");
  useEffect(() => {
    setListNameValue(listName ?? "");
  }, [listName]);
  const deleteListMutation = useDeleteList();
  const [showModal, setShowModal] = useState<boolean>(false);
  const listMutation = useListMutation({ onSuccess: () => setShowModal(false) });

  return (
    <div>
      <DropdownMenu
        trigger={
          <Button variant="text" className="shrink-0" iconButton>
            <Icon name="bf-i-ph-dots-three" className=" c-base11" />
          </Button>
        }
      >
        <DropdownMenuItem onSelect={() => setShowModal(true)}>
          <Icon name="bf-i-ph-pencil-simple" className="c-base11 mie-3" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => deleteListMutation.mutate(listId)}>
          {deleteListMutation.isPending ? <LoadingSpinner /> : <Icon name="bf-i-ph-trash" className="c-base11 mie-3" />}
          Delete
        </DropdownMenuItem>
      </DropdownMenu>

      <Modal open={showModal} setOpen={setShowModal}>
        <div>
          <h3 className="H3">Rename List</h3>
          <div className="h-6"></div>
          <form
            className="mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              listMutation.mutate({ id: listId, name: listNameValue });
            }}
          >
            <div className="grid gap-3 items-end">
              <div className="grow">
                <Input
                  name="name"
                  label=""
                  type="text"
                  placeholder="New Folder"
                  value={listNameValue}
                  autoFocus
                  setValue={setListNameValue}
                />
              </div>
                <Button
                  className="w-full"
                  variant="solid"
                  type="submit"
                  isLoading={listMutation.isPending}
                  disabled={!userMeQ.data?.id}
                >
                  <Icon name="bf-i-ph-pencil-simple" className="c-base11" />
                  <span className="">Rename</span>
                </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
