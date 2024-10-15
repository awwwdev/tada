"use client";

import TaskDetailsPanel from "@/components/DetailsPanel";

import { useGlobalContext } from "@/components/Provider";
import SettingsPanel from "@/components/SettingsPanel";
import SmartList from "@/components/SmartList";
import TaskInput from "@/components/TaskInput";
import Drawer from "@/components/ui/Drawer";
import UserList from "@/components/UserList";
import SideMenu from '@/components/SideMenu';

import type { List } from "@tada/backend";
export default function Page() {
  const { currentList } = useGlobalContext();

  const {
    settingsPanelOpen,
    setSettingsPanelOpen,
  } = useGlobalContext();

  return (
    <div className="grid gap-6 h-[100vh] w-[100vw]" style={{ gridTemplateRows: "1fr" }}>
      <main
        className={`grid  overflow-hidden 
        grid-cols-[1fr]
        sm:grid-cols-[min(20%,15rem)_3fr_3fr]`}
      >
        <SideMenu />
        <div className="grid gap-0 py-6 overflow-hidden" style={{ gridTemplateRows: "1fr auto" }}>
            {currentList.type === "user-list" && <UserList listId={currentList.id} />}
            {currentList.type === "smart-list" && <SmartList listId={currentList.id} />}
          <TaskInput />
        </div>
        <TaskDetailsPanel />
      </main>
      <Drawer side="right" open={settingsPanelOpen} setOpen={setSettingsPanelOpen}>
        <SettingsPanel />
      </Drawer>
    </div>
  );
}
