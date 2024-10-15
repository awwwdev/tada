import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { TaskFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { useGlobalContext } from "./Provider";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function TaskInput() {

  const queryClient = useQueryClient();
  const [draft, setDraft, removeValue] = useLocalStorage<TaskFields>("darft-task", {
    label: "",
    status: "to-do",
    authorId: "",
  });
  const userMeQ = useUserMe();
  const { currentList ,  setShowAuthModal } = useGlobalContext();
  const addTaskM = useMutation({
    mutationFn: (task: TaskFields) =>
      fetchAPI.POST(`/tasks`, {
        ...task,
        authorId: userMeQ.data?.id,
        listId: currentList.type === "user-list" ? currentList.id : undefined,
      }),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      setDraft({
        label: "",
        status: "to-do",
        authorId: "",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
    onSettled: () => {
      if (inputRef.current) inputRef.current.focus();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <div className="bottom-100% h-6 bg-gradient-to-t from-base3 to-transparent  absolute w-full z-10"></div>
      <div className="h-2 bg-base3"></div>
      <form
        className="mt-auto"
        onSubmit={(e) => {
          if (!userMeQ.data) {
            setShowAuthModal(true);
            return;
          }
          e.preventDefault();
          addTaskM.mutate(draft);

        }}
      >
        <div className="flex gap-3 items-end px-3">
          <div className="grow">
            <Input
              ref={inputRef}
              name="new-task"
              label=""
              type="text"
              value={draft.label}
              onChange={(e) => setDraft((s) => ({ ...s, label: e.target.value }))}
            />
          </div>
          <Button
            variant="solid"
            type={userMeQ.data ? "submit" : "button"}
            isLoading={addTaskM.isPending}
            onClick={() => {
              if (!userMeQ.data) {
                setShowAuthModal(true);
              }
            }}
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
