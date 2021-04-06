import { MenuItem, MenuItemAction } from "@patternfly/react-core";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GripHorizontalIcon from "@patternfly/react-icons/dist/js/icons/grip-horizontal-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/js/icons/exclamation-circle-icon";
import TrashIcon from "@patternfly/react-icons/dist/js/icons/trash-icon";
import {
  QuickStart,
  QuickStartTask,
} from "@quickstarts/utils/quick-start-types";

type FormInputProps = {
  items: Array<QuickStartTask>;
  activeMenuItem: any;
  setActiveMenuItem: Function;
  dangerIcon: Function;
  deleteTask: Function;
  quickStart: QuickStart;
  updateQuickStart: Function;
  taskErrors: any;
  setTaskErrors: Function;
};

const DraggableComponent: React.FC<FormInputProps> = ({
  items,
  activeMenuItem,
  setActiveMenuItem,
  dangerIcon,
  deleteTask,
  quickStart,
  updateQuickStart,
  taskErrors,
  setTaskErrors,
}) => {
  const grid = 1;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "white" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    // width: 250,
  });

  const updateQuickStartTasks = (arr, item, to) => {
    const newQuickStart = { ...quickStart };
    // Remove current tasks
    delete newQuickStart.spec.tasks;

    // Move the item to its new position
    arr.splice(to, 0, item[0]);

    // Add new tasks
    newQuickStart.spec.tasks = arr;

    // Update quick start
    updateQuickStart(newQuickStart);
    setActiveMenuItem(to);
  };

  const moveInArray = (
    arr: Array<any>,
    from: number,
    to: number,
    type: string
  ) => {
    // Make sure a valid array is provided
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      throw new Error("Please provide a valid array");
    }

    // Delete the item from it's current position
    var item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
      throw new Error("There is no item in the array at index " + from);
    }

    if (type === "er") {
      arr.splice(to, 0, item[0]);
      let newTaskErrObject = {};
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        newTaskErrObject[index] = element;
      }

      setTaskErrors(newTaskErrObject);
    }

    if (type === "qs") {
      updateQuickStartTasks(arr, item, to);
    }
  };

  const onDragEnd = (e) => {
    const to = e.destination.index;
    const from = e.source.index;

    moveInArray(items, from, to, "qs");

    if (Object.keys(taskErrors).length > 0) {
      let arr = [];
      for (let k in taskErrors) {
        arr.push(taskErrors[k]);
      }
      moveInArray(arr, from, to, "er");
    }
  };

  return (
    <React.Fragment>
      {items ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((task: QuickStartTask, index) => (
                  <Draggable
                    key={
                      task["title"] + index
                        ? `${task["title"]}${index}`
                        : index.toString()
                    }
                    draggableId={
                      task["title"]
                        ? `${task["title"]}${index}`
                        : index.toString()
                    }
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <MenuItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        icon={
                          dangerIcon(index) ? (
                            <ExclamationCircleIcon
                              aria-hidden
                              className="danger-color"
                            />
                          ) : null
                        }
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
    </React.Fragment>
  );
};

export default DraggableComponent;
