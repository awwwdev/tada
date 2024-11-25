import { createInsertSchema } from "drizzle-zod";

import { customType, foreignKey, json, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import { AUTH_USER } from "./supabaseTables";
// import * as x from 'drizzle-orm/

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
});

type Settings = {
  showCompletedTasks?: boolean;
  theme?: "light" | "dark" | "system";
  startOfWeek?: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
};

export const USER = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    // username: text('username').unique(),
    authUserId: uuid("auth_user_id").notNull(),
    // email: text("email").unique().notNull(),
    // phone: text("phone").unique().notNull(),
    // passwordHash: bytea('password_hash').notNull(),
    // salt: bytea('salt').notNull(),
    settings: json("settings")
      .$type<Settings>()
      .default({ theme: "system", showCompletedTasks: true, startOfWeek: "sunday" }),
  },
  (table) => [
    // pgPolicy(`policy-insert`, {
    //   for: 'insert',
    //   to: serviceRole,
    //   withCheck: sql`false`,
    // }),
    foreignKey({
      columns: [table.id],
      // reference to the auth table from Supabase
      foreignColumns: [AUTH_USER.id],
      name: "profiles_id_fk",
    })
      .onDelete("cascade")
      .onUpdate("cascade")
  ]
);

// export type UserInsert = typeof USER.$inferInsert;

const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system").optional(),
  showCompletedTasks: z.boolean().default(true).optional(),
  startOfWeek: z
    .enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
    .default("sunday")
    .optional(),
});

export const userCreateSchema = createInsertSchema(USER, {
  // email: z.string().email("Please provide a valid email."),
  // username: z
  //   .string()
  //   .min(3, 'Username must be at least 3 characters long.')
  //   .max(25, 'Username must be at most 25 characters long.'),
  settings: settingsSchema,
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    // salt: true,
    // passwordHash: true,
  })
  .strict();

export const userUpdateSchema = userCreateSchema.partial();

export type User = typeof USER.$inferSelect;
export type NewUser = z.infer<typeof userCreateSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
