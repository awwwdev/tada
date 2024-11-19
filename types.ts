export type {
  List,
  NewList,
  UpdateList,
  ListHue,
  Folder,
  NewFolder,
  UpdateFolder,
  Task,
  NewTask,
  UpdateTask,
  ListTask,
  NewListTask,
  UpdateListTask,
} from "@tada/backend";

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

