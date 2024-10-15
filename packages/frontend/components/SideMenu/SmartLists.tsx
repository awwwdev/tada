"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useGlobalContext } from "@/components/Provider";
import SMART_LIST_IDS from "@/constants/smartListIds";
import React from "react";
import MenuItem from "../ui/MenuItem/MenuItem";

export default function SmartLists() {
  const { setSelectedSmartListId, currentList, setListsPanelOpen } = useGlobalContext();

  return (
    <ul className="flex flex-col gap-3  ">
      <MenuItemLocal
        icon="bf-i-ph-house-simple"
        onClick={() => {
          setSelectedSmartListId(SMART_LIST_IDS.ALL_TASKS);
          setListsPanelOpen(false);
        }}
        active={currentList.id === SMART_LIST_IDS.ALL_TASKS}
      >
        All Tasks
      </MenuItemLocal>
      {/* <MenuItemLocal icon="bf-i-ph-sun" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DO_TODAY)}>
        Do Today
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-sun-horizon" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DO_TOMORROW)}>
        Do Tomorrow
      </MenuItemLocal> */}
      <MenuItemLocal
        icon="bf-i-ph-star"
        onClick={() => {
          setSelectedSmartListId(SMART_LIST_IDS.STARRED);
          setListsPanelOpen(false);
        }}
        active={currentList.id === SMART_LIST_IDS.STARRED}
      >
        Starred
      </MenuItemLocal>
      {/* <MenuItemLocal icon="bf-i-ph-calendar-dots" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.WITH_DUE_DATES)}>
        With Due dates
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-user" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ASSIGNED_TO_ME)}>
        Asigned To Me
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-users" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ASSIGNED)}>
        Asigned
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-alarm" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.WITH_REMINDERS)}>
        With Reminders
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-sneaker-move" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ROUTINES)} >
        Rutines
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-archive" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ARCHIVED)}>
        Archived Tasks
      </MenuItemLocal> */}
      {/* <MenuItemLocal icon="bf-i-ph-trash" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DELETED)} >
        Deleted Tasks
      </MenuItemLocal> */}
    </ul>
  );
}

function MenuItemLocal({
  icon,
  children,
  onClick,
  active,
}: {
  icon: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <li>
      <Button variant="text" className="w-full" preStyled={false} onClick={onClick}>
        <MenuItem size="xl">
          <Icon name={icon} className="mie-1.5 c-base11" />
          {children}{" "}
        </MenuItem>
      </Button>
    </li>
  );
}
