import useUserMe from "@/hooks/useUserMe";
import { Task } from "@/types";
import { useGlobalContext } from "./Provider";
import TaskItem from "./TaskItem";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";
import GradientMask from "./ui/GradientMask";
import Icon from "./ui/Icon";
import ScrollArea from "./ui/ScrollArea";

export default function List({
  tasks,
  listName,
  listControls,
}: {
  tasks: Task[];
  listName: React.ReactNode;
  listControls?: React.ReactNode;
}) {
  const notDeletedTasks = tasks.filter((t: Task) => !t.deleted) ?? [];
  const userMeQ = useUserMe();

  const { setShowAuthModal } = useGlobalContext();

  const pinnedTasks = notDeletedTasks.filter((t: Task) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t: Task) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];

  return (
    <EmptyState
      isEmpty={!userMeQ.data}
      title="Please Sign-up/Login."
      subtitle=""
      icon={<Icon name="bf-i-ph-info" />}
      content={
        <>
          <Button variant="ghost" className="mt-3 justify-start" onClick={() => setShowAuthModal(true)}>
            <Icon name="bf-i-ph-sign-in" className="mie-1.5 c-base11" />
            Sign Up / Login
          </Button>
        </>
      }
    >
      <ListTemplate listName={listName} listControls={listControls}>
        <EmptyState
          isEmpty={!orderedTasks.length}
          title="No Tasks"
          subtitle="Add tasks using the input below"
          icon={<Icon name="bf-i-ph-info" />}
        >
          <ul className=" gap-3 flex flex-col overflow-y-scroll px-4.5">
            {orderedTasks.map((task, index) => {
              return <TaskItem key={index} task={task} dragHandleProps={{}} />;
            })}
          </ul>
        </EmptyState>
      </ListTemplate>
    </EmptyState>
  );
}

function ListTemplate({
  children,
  listName,
  listControls,
}: {
  children: React.ReactNode;
  listName: React.ReactNode;
  listControls: React.ReactNode;
}) {
  return (
    <div className="gap-3 grid overflow-hidden h-full" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="px-4.5 flex gap-3 w-full ">
        <div className="flex gap-1.5 items-center">
          <MobileHamburgerMenuButton />
          <h2 className="H3">{listName}</h2>
        </div>
        <div className="mis-auto">{listControls}</div>
      </div>
      <GradientMask
        className="h-full overflow-hidden"
        transparencyStops={[
          [0, 0],
          [5, 100],
          [95, 100],
          [100, 0],
        ]}
      >
        <ScrollArea orientation="vertical">
          <div className="py-8 ">{children}</div>
        </ScrollArea>
      </GradientMask>
    </div>
  );
}

function MobileHamburgerMenuButton() {
  const { setListsPanelOpen, listsPanelOpen } = useGlobalContext();

  return (
    <Button
      variant="text"
      className="sm:hidden"
      onClick={() => {
        setListsPanelOpen(!listsPanelOpen);
      }}
      iconButton
    >
      <Icon name="bf-i-ph-list" className="c-base11 " />
      <span className="sr-only">menu {listsPanelOpen ? "open" : "closed"}</span>
    </Button>
  );
}

// function ListContent({ tasks, listName }: { tasks: Task[]; listName: string }) {
//   const listContainerRef = useRef<HTMLDivElement>(null);
//   // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
//   return (
//     <div ref={listContainerRef} className="" suppressHydrationWarning>
//       {/* @ts-ignore */}
//       <DraggableList
//         itemKey="id"
//         template={(props: TemplateProps) => <ListItemTemplate {...props} />}
//         list={tasks}
//         onMoveEnd={(newList: Task[]) => {
//           const pinnedTasks = newList.filter((t: Task) => t.pinned);
//           const notPinnedTasks = newList.filter((t: Task) => !t.pinned);
//           const newListWithUpdatedOrders = [...pinnedTasks, ...notPinnedTasks].map((t: Task, index: number) => {
//             const newTask = { ...t };
//             newTask.lists[listName].orderInList = index;
//             return newTask;
//           });
//           setTasks(newListWithUpdatedOrders);
//         }}
//         container={() => listContainerRef.current}
//       />
//     </div>
//   );
// }

type TemplateProps = {
  item: Task;
  itemSelected: number;
  dragHandleProps: object;
};

function ListItemTemplate({ item, itemSelected, dragHandleProps }: TemplateProps) {
  const scale = itemSelected * 0.05 + 1;
  const shadow = itemSelected * 15 + 1;
  const dragged = itemSelected !== 0;

  return (
    <div
      className={`overflow-hidden max-h-[100%] rd-3
        ${dragged ? "dragged" : ""} `}
      style={{
        transformOrigin: "30% 50% 0px",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div className="grid" style={{ gridTemplateColumns: "1fr auto" }}>
        <TaskItem
          task={item}
          // setTask={(newTask) => updateTaskById({ id: item.id, task: newTask })}
          dragHandleProps={dragHandleProps}
        />
      </div>
    </div>
  );
}

{
  /* {userMeQ.data && (
            <EmptyState
              title="No Tasks"
              subtitle="Add tasks using the input below"
              icon={<Icon name="bf-i-ph-info" />}
            />
          )} */
}
