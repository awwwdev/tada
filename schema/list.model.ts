import { createInsertSchema } from 'drizzle-zod';

import { decimal, pgTable, text, boolean, uuid, timestamp, json } from 'drizzle-orm/pg-core';
import { USER } from './user.model';
import { FOLDER } from './folder.model';
import { z } from 'zod';

type Filters = {
  deleted?: boolean;
  archived?: boolean;
  starred?: boolean;
  pinned?: boolean;
};
const LIST_HUES = ['red' , 'pink' , 'grape' , 'violet' , 'indigo' , 'blue' , 'cyan' , 'teal' , 'green' , 'lime' , 'yellow' , 'orange' , 'slate'] as const;

export type ListHue = typeof LIST_HUES[number];
type ListTheme = {
  hue?: ListHue
};


export const LIST = pgTable('list', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  name: text('name').notNull(),
  emojis: text('emojis').array(),
  authorId: uuid('author_id').references(() => USER.id),
  description: text('description'),
  folderId: uuid('folder_id').references(() => FOLDER.id),
  show: boolean('show'),
  orderInFolder: decimal('order_in_folder').default("0"),
  theme: json('theme').$type<ListTheme>().default({}),
  // orderOfTasks: uuid('order_of_tasks').references(() => TASK.id).array().notNull(),
});


const refinements = {
  theme: z.object({
    hue: z.enum(LIST_HUES).optional(),
  }),
  emojis: z.array(z.string()).optional(),
}

export const listCreateSchema = createInsertSchema(LIST, refinements).omit({ id: true, createdAt: true, updatedAt: true }).strict();
export const listUpdateSchema = listCreateSchema.partial();

export type List = typeof LIST.$inferSelect;
export type NewList = z.infer<typeof listCreateSchema>;
export type UpdateList = z.infer<typeof listUpdateSchema>;