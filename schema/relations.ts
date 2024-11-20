import { relations } from 'drizzle-orm';
import { TASK } from './task.model';
import { LIST } from './list.model';
import { USER } from './user.model';
import { LIST_TASK } from './listTask.model';
import { FOLDER } from './folder.model';

export const taskRelations = relations(TASK, ({ one, many }) => ({
  author: one(USER, { fields: [TASK.authorId], references: [USER.id] }),
  lists: many(LIST_TASK)
}));

export const listRelations = relations(LIST, ({ one, many }) => ({
  author: one(USER, { fields: [LIST.authorId], references: [USER.id] }),
  tasks: many(LIST_TASK),
  // folder: one(FOLDER, { fields: [LIST.folderId], references: [FOLDER.id] }),
}));

export const folderRelations = relations(FOLDER, ({ one, many }) => ({
  author: one(USER, { fields: [FOLDER.authorId], references: [USER.id] }),
  // lists: many(LIST),
}));


export const listTaskRelations = relations(LIST_TASK, ({ one }) => ({
  list: one(LIST, { fields: [LIST_TASK.listId], references: [LIST.id] }),
  task: one(TASK, { fields: [LIST_TASK.taskId], references: [TASK.id] }),
}));
