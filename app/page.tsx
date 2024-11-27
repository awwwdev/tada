import TaskDetailsPanel from "@/components/DetailsPanel";
import SettingsDrawer from "@/components/SettingsDrawer";
import SideMenu from '@/components/SideMenu';
import TaskInput from "@/components/TaskInput";
import UserOrSmartList from "@/components/UserOrSmartList";


export default function Page() {

  return (
    <div className="grid gap-6 h-[100vh] w-[100vw]" style={{ gridTemplateRows: "1fr" }}>
      <main
        className={`grid  overflow-hidden 
        grid-cols-[1fr]
        sm:grid-cols-[min(20%,15rem)_3fr_3fr]`}
      >
        <SideMenu />
        <div className="grid gap-0 py-6 overflow-hidden " style={{ gridTemplateRows: "1fr auto" }}>
          <UserOrSmartList />
          <TaskInput />
        </div>
        <TaskDetailsPanel />
      </main>
      <SettingsDrawer />
    </div>
  );
}
