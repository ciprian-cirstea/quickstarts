import * as React from "react";
import {
  Menu,
  MenuItem,
  MenuItemAction,
  MenuList,
} from "@patternfly/react-core";
import GripHorizontalIcon from "@patternfly/react-icons/dist/js/icons/grip-horizontal-icon";
import TrashIcon from "@patternfly/react-icons/dist/js/icons/trash-icon";
import { Divider } from "@patternfly/react-core";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

type QuickStartEditPageProps = {
  activeMenuItem?: any;
  handleMenuClick: any;
  quickStart?: any;
  updateQuickStart: Function;
};

export const QuickStartEditMenu: React.FC<QuickStartEditPageProps> = ({
  activeMenuItem,
  handleMenuClick,
  quickStart,
  updateQuickStart,
}) => {
  const deleteTask = (clicked: number) => {
    try {
      const newTasks = quickStart.spec.tasks.filter(
        (task: any, i: number) => i !== clicked
      );
      const newQuick = { ...quickStart };
      newQuick.spec.tasks = newTasks;
      console.log(newQuick);
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

  return (
    <Menu activeItemId={activeMenuItem} onSelect={handleMenuClick}>
      <MenuList>
        <MenuItem isSelected={activeMenuItem === 100} itemId={100}>
          Read Me First
        </MenuItem>
        <MenuItem isSelected={activeMenuItem === 101} itemId={101}>
          Tile Editor
        </MenuItem>
        <MenuItem isSelected={activeMenuItem === 99} itemId={99}>
          Introduction
        </MenuItem>
        <MenuItem isSelected={activeMenuItem === 98} itemId={98}>
          Conclusion
        </MenuItem>
        <Divider />

        <MenuItem isDisabled={true}>
          Tasks [{quickStart?.spec.tasks.length}]
        </MenuItem>
      </MenuList>
      <Divider />

      <MenuList>
        {quickStart
          ? quickStart?.spec.tasks.map((task, index: number) => {
              console.log("task menu", task);
              return (
                <MenuItem
                  isSelected={activeMenuItem === index}
                  actions={
                    <React.Fragment>
                      <MenuItemAction
                        icon={<TrashIcon aria-hidden />}
                        actionId="code"
                        onClick={() => deleteTask(index)}
                        aria-label="Code"
                      />
                      <MenuItemAction
                        className="task-grip-icon"
                        icon={<GripHorizontalIcon aria-hidden />}
                        actionId="code"
                        onClick={() => console.log("clicked on code icon")}
                        aria-label="Code"
                      />
                    </React.Fragment>
                  }
                  key={index}
                  itemId={index}
                >
                  {`${task.title.substring(0, 35)}...`}
                </MenuItem>
              );
            })
          : null}
      </MenuList>

      <Divider />

      <MenuItem isSelected={activeMenuItem === 102} itemId={102}>
        Add Task+
      </MenuItem>

      {/* <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {quickStart
                ? quickStart.spec.tasks.map((task, index: number) => {
                    return (
                      <Draggable key={index} draggableId={index} index={index}>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <MenuItem
                            isSelected={activeMenuItem === index}
                            actions={
                              <React.Fragment>
                                <MenuItemAction
                                  icon={<TrashIcon aria-hidden />}
                                  actionId="code"
                                  onClick={() =>
                                    console.log("clicked on code icon")
                                  }
                                  aria-label="Code"
                                />
                                <MenuItemAction
                                  className="task-grip-icon"
                                  icon={<GripHorizontalIcon aria-hidden />}
                                  actionId="code"
                                  onClick={() =>
                                    console.log("clicked on code icon")
                                  }
                                  aria-label="Code"
                                />
                              </React.Fragment>
                            }
                            key={index}
                            itemId={index}
                          >
                            {`${task.title.substring(0, 35)}...`}
                          </MenuItem>
                        </div>
                      </Draggable>
                    );
                    {
                      provided.placeholder;
                    }
                  })
                : null}


              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
    </Menu>
  );
};
