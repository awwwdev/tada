"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditorState } from "draft-js";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Note({ task }: { task: Task }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [showEdit, setShowEdit] = useState(false);
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>(task.note ?? "");
  useEffect(() => {
    setValue(task.note ?? "");
  }, [task.note]);
  const taskMutation = useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => fetchAPI.PATCH(`/tasks/${id}`, { note }),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS, task.id] });
      setShowEdit(false);
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // useAutosizeTextArea(textareaRef.current, value);
  return (
    <div className="flex gap-1.5">
      <div className="grow">
        <h3 className="c-base11 H3">
          <Icon name="bf-i-ph-note-blank" className="c-base11 mie-2" />
          Note
        </h3>
        {/* <div>
          <Editor editorState={editorState} onChange={setEditorState}  />
        </div> */}
        <div className="h-3"></div>
        <div className="flex gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              taskMutation.mutate({ id: task.id, note: value });
              setShowEdit(false);
            }}
            className="flex gap-3 grow"
          >
            <textarea
              name="notel"
              ref={textareaRef}
              value={value}
              placeholder="Add a note to this task..."
              // defaultValue={task.label}
              onChange={(e) => {
                setValue(e.target.value);
                setShowEdit(true);
              }}
              className={` 
                placeholder:italic
            focus:bg-base3
            focus:outline-none
            bg-base1 b-transparent b-1 px-1.5 rd-1.5 w-full overflow-hidden resize-none`}
              // disabled={!showEdit}
              rows={1}
              // autoFocus
            ></textarea>
            {showEdit ? (
              <Button variant="solid" type="submit" isLoading={taskMutation.isPending}>
                Save
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setShowEdit(true);
                  if (textareaRef.current) {
                    textareaRef.current?.focus();
                  }
                }}
                iconButton
                className="mis-auto shrink-0"
              >
                <Icon name="bf-i-ph-pencil-simple" className="c-base11" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
