import SmartList from "@/components/SmartList";
import UserList from "@/components/UserList";
import { createDrizzleSupabaseClient } from "@/db/db";
import { LIST_TASK } from "@/schema/listTask.model";
import { SMART_LIST_IDS } from "@/schema/smartListTask.model";
import { Task, TASK } from "@/schema/task.model";
import { SmartListId } from "@/types";
import { createClientForServer } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ listId: string }>;
}) {
  const listId = (await params).listId;
  const db = await createDrizzleSupabaseClient();
  const supabase = createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-3">
      <div>
      </div>
      <>{children}</>
    </div>

    )
  }

  let isSmartList = SMART_LIST_IDS.some((item) => item === listId);

  const listName = "ListName";
  let smartListTasks: Task[] = [];
  let userListTasks: Task[] = [];
  let userListName = "";
  // fetch list id
  if (isSmartList) {
    smartListTasks = await db(async (tx) =>
      tx.query.TASK.findMany({
        where: eq(TASK.authorId, user?.id ?? ""),
      })
    );
    console.log("🚀 ~ smartListTasks:", smartListTasks)
  } else {
    const listTasks = await db(async (tx) =>
      tx.query.LIST_TASK.findMany({
        where: eq(LIST_TASK.listId, listId),
        with: {
          task: true,
          list: true,
        },
      })
    );
    userListName = listTasks[0]?.list?.name ?? "";
    userListTasks = listTasks.map((t) => t.task);
  }

  console.log('re run in list/[listId] layout')

  return (
    <div className="flex gap-3">
      <div>
        {isSmartList ? (
          <SmartList listId={listId as SmartListId} tasks={smartListTasks} />
        ) : (
          <UserList listId={listId} tasks={userListTasks} listName={userListName ?? ""} />
        )}
      </div>
      <>{children}</>
    </div>
  );
}