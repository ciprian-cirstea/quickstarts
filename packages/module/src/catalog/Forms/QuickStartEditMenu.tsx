import * as React from "react";
import {
  Menu,
  MenuItem,
  MenuItemAction,
  MenuList,
} from "@patternfly/react-core";
import GripHorizontalIcon from "@patternfly/react-icons/dist/js/icons/grip-horizontal-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/js/icons/exclamation-circle-icon";
import TrashIcon from "@patternfly/react-icons/dist/js/icons/trash-icon";
import { Divider } from "@patternfly/react-core";
import "./QuickStartEditmenu.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableComponent from "./DraggableComponent";

type QuickStartEditPageProps = {
  activeMenuItem?: any;
  setActiveMenuItem: Function;
  handleMenuClick: any;
  quickStart?: any;
  updateQuickStart: Function;
  submitted: boolean;
  errors: object;
  taskErrors;
  setTaskErrors: Function;
};

export const QuickStartEditMenu: React.FC<QuickStartEditPageProps> = ({
  activeMenuItem,
  setActiveMenuItem,
  handleMenuClick,
  quickStart,
  updateQuickStart,
  submitted,
  errors,
  taskErrors,
  setTaskErrors,
}) => {
  const deleteTask = (clicked: number) => {
    try {
      const newTasks = quickStart.spec.tasks.filter(
        (task: any, i: number) => i !== clicked
      );
      const newQuick = { ...quickStart };
      newQuick.spec.tasks = newTasks;

      updateQuickStart(newQuick);

      if (activeMenuItem < 100) {
        // Handle task change and delete
        if (newTasks.length > 0) {
          let selectedTask: number;
          const total = newTasks.length;

          if (activeMenuItem != clicked) {
            selectedTask =
              activeMenuItem < clicked ? activeMenuItem : activeMenuItem - 1;
          } else if (clicked === total) {
            selectedTask = total - 1;
          } else {
            selectedTask = activeMenuItem;
          }

          handleMenuClick(null, selectedTask);
        } else {
          handleMenuClick(null, 99);
        }
      } else {
        handleMenuClick(null, activeMenuItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dangerIcon = (itemNr: number): boolean => {
    if (!submitted) return false;
    let isDanger = false;

    if (itemNr < 98) {
      const taskErrorKeys = [];
      for (let k in taskErrors[itemNr]) {
        taskErrorKeys.push(k);
      }

      const err = [
        "description",
        "failed",
        "failedTaskHelp",
        "instructions",
        "success",
      ];

      isDanger = err.some((r) => taskErrorKeys.includes(r));
    } else {
      const errorKeys = [];
      for (let k in errors) {
        errorKeys.push(k);
      }

      if (itemNr === 101) {
        const err = [
          "displayName",
          "icon",
          "version",
          "durationMinutes",
          "description",
        ];
        isDanger = err.some((r) => errorKeys.includes(r));
      }

      if (itemNr === 99) {
        const err = ["introduction"];
        isDanger = err.some((r) => errorKeys.includes(r));
      }
      if (itemNr === 98) {
        const err = ["conclusion"];
        isDanger = err.some((r) => errorKeys.includes(r));
      }
    }

    return isDanger;
  };

  const menuItems = [
    {
      nr: 101,
      label: "Tile Editor",
    },
    {
      nr: 99,
      label: "Introduction",
    },
    {
      nr: 98,
      label: "Conclusion",
    },
  ];

  return (
    <Menu activeItemId={activeMenuItem} onSelect={handleMenuClick}>
      <MenuList>
        <MenuItem isSelected={activeMenuItem === 100} itemId={100}>
          Read Me First
        </MenuItem>

        {menuItems.map((menuItem: object, index: number) => (
          <MenuItem
            key={menuItem["nr"]}
            icon={
              dangerIcon(menuItem["nr"]) ? (
                <ExclamationCircleIcon aria-hidden className="danger-color" />
              ) : null
            }
            isSelected={activeMenuItem === menuItem["nr"]}
            itemId={menuItem["nr"]}
          >
            {menuItem["label"]}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem isDisabled={true}>
          Tasks [{quickStart?.spec?.tasks?.length}]
        </MenuItem>
      </MenuList>

      <DraggableComponent
        items={quickStart?.spec.tasks}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        dangerIcon={dangerIcon}
        deleteTask={deleteTask}
        quickStart={quickStart}
        updateQuickStart={updateQuickStart}
        taskErrors={taskErrors}
        setTaskErrors={setTaskErrors}
      />

      <MenuItem isSelected={activeMenuItem === 102} itemId={102}>
        Add Task+
      </MenuItem>
    </Menu>
  );
};
