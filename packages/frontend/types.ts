import React, { ElementType } from "react";
import SMART_LIST_IDS from "./constants/smartListIds";

export type SmartListId = (typeof SMART_LIST_IDS)[keyof typeof SMART_LIST_IDS];

export type CurrentList =
  | {
    type: "user-list";
    id: string;
  }
  | {
    type: "smart-list";
    id: SmartListId;
  };

type Document = {
  // _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // __v: string;
};

export type User = Document & UserFields & UserPopulated;
export type Folder = Document & FolderFields;
export type List = Document & ListFields;
export type Task = Document & TaskFields;

type Emoji = string;

export type UserFields = {
  email: string;
  settings: Settings;
};

type UserPopulated = {
  folders: Folder[];
};

export type FolderFields = {
  name: string;
  emojis?: Emoji[];
  authorId: string;
  lists?: FolderListProperties[];
};

type FolderListProperties = {
  addedAt: Date;
  id: string;
  show?: boolean | null | undefined;
  orderInFolder?: number | null | undefined;
};

export type ListFields = {
  name: string;
  authorId: string;
  emojis?: string[];
  tasks: TasktPorpertisInList[];
  description?: string | null;
  folderId?: string | null;
  theme: any;
  // show?: boolean;
};

export type TasktPorpertisInList = {
  addedAt: Date;
  id: string;
  task: string;
  orderInList?: number | null;
};

export type TaskFields = {
  authorId: string;
  listId?: string | null;
  label: string;
  status: "done" | "to-do";

  emojis?: string[];
  note?: string | null;
  // lists?: TaskListPorpertis[];

  dueAt?: Date | null;

  deleted?: boolean | null;
  arhived?: boolean | null;
  starred?: boolean | null;
  pinned?: boolean | null;
  archived?: boolean | null | undefined;
  steps?: string[];
  preTasks?: string[];
  postTasks?: string[];
  comments?: TaskComment[];
  assingnees?: TaskAssignee[];
  attachments?: TaskAttachment[];
  routines?: TaskRoutine[];
  reminders?: TaskReminder[];
};

export type TaskComment = {
  createdAt: Date;
  body: string;
  authorId?: string | null;
  // replyToCommentId?: string | null;
};

type TaskAttachment = {
  createdAt: Date;
  body: string;
  authorId?: string | null | undefined;
};

type TaskAssignee = {
  createdAt: Date;
  authorId?: string | null;
};

type TaskRoutine = {
  startAt: Date;
  endAt: Date;
  numberOfRepeats: number;
  periods: "minute" | "hour" | "day" | "week" | "month" | "year";
  notification?: boolean | null | undefined;
  everyXPeriods: number;
};

type TaskReminder = {
  minutesBeforeDueDate: number;
  remindAt: Date;
};

export type Settings = {
  theme: "light" | "dark" | "system";
  showCompletedTasks: boolean;
  startOfWeek: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
  planForTommorowSettings: {};
};

// ---------------------------

export type RNode = React.ReactNode;

export type Children = { children: React.ReactNode };
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLProps<T extends ElementType> = React.ComponentPropsWithoutRef<T>;
// frequently used props type  in uikit -----------------------------------------------
export type CLS = { className?: string | null; preStyled?: boolean };
