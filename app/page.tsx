"use client";

import TaskDetailsPanel from "@/components/DetailsPanel";

import Header from "@/components/header";
import ListsPanel from "@/components/ListsPanel";
import { useGlobalContex } from "@/components/Provider";
import TaskInput from "@/components/TaskInput";
import UserList from "@/components/UserList";
import SmartList from "@/components/SmartList";
import Drawer from "@/components/ui/Drawer";
import { useState } from "react";
import Button from "@/components/ui/Button";
import MobileOnly from "@/components/ui/MobileOnly";
import Icon from "@/components/ui/Icon";
import SettingsPanel from "@/components/SettingsPanel";

export default function Page() {
  const { currentList } = useGlobalContex();
  const [open, setOpen] = useState(false);

  const {
    listsPanelOpen,
    setListsPanelOpen,
    detailsPanelOpen,
    setDetailsPanelOpen,
    settingsPanelOpen,
    setSettingsPanelOpen,
  } = useGlobalContex();

  return (
    <div className="grid gap-6 h-[100vh] w-[100vw]" style={{ gridTemplateRows: "1fr" }}>
      <main
        className={`grid  overflow-hidden 
        grid-cols-[1fr]
        sm:grid-cols-[min(20%,15rem)_3fr_3fr]`}
      >
        <ListsPanel />
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
