const QUERY_KEYS = {
  USER_ME: "userMe",
  TASKS: "tasks",
  FOLDERS: "folders",
  LISTS: "lists",
  SETTINGS: "SETTINGS ",
};

export default QUERY_KEYS;


// tasks
// tasks taskId
// tasks list ListId
// tasks list folder FolderId


const invalidationKeys = {
  TASK_ADD: ["all-tasks-list"],
  TASK_DELETE: ["tasks"],
  TASK_SUMMARY_UPDATE: ["tasks"],
  TASK_DETAILS_UPDATE: ["tasks", { taskId: '' }],
  LIST_ADD: ["lists"],
  LIST_DELETE: ["lists"],
  LIST_SUMMARY_UPDATE: ['lists'],
  LIST_DETAILS_UPDATE: ["lists", "listId"],
  FOLDER_ADD: ['folders'],
  FOLDER_DELETE: ['folders'],
  FOLDER_SUMMARY_UPDATE: ['folders'],
  FOLDER_DETAILS_UPDATE: ['folders', 'folderId'],
};



// if a task is added to all tasks -> invalidate default-list + the list added to
// if a task is deleted            -> invalidate default-list + the list deleted from + all lists containing that task
// if a task summary is updated    -> invalidate default-list + all list containing that task

// if a task details is change     -> invalidate only task data



// if a list is added to default-folder -> invalidate default-folder + the folder added to
// if a list is deleted                 -> invalidate default-folder + the folders deleted from + all folder containing that list
// if a list summary is updated         -> invalidate default-folder + all folders containing that list

// if a list details is change          -> invalidate only list data
// if a list is reordered               -> invalidate only that list data (list-task)



// if a folder is added to default-panel -> invalidate default-panel + the folder added to
// if a folder is deleted                -> invalidate default-panel + the folders deleted from + all folder containing that folder
// if a folder summary is updated        -> invalidate default-panel + all folders containing that folder

// if a folder details is change         -> invalidate only folder data
// if a folder is reordered              -> invalidate only that folder data



/*

data flow 

smart lists:
Task[] -> <List />


user lists:
List & {tasks: (ListTask & task: Task)[]} -> <UserList /> -> Task[] -> <Task />



*/