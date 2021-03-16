import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Menu,
  MenuList,
  MenuItem,
} from "@patternfly/react-core";
import "./QuickStartTile.scss";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import QuickStartTile from "./QuickStartTile";

import { getQuickStartStatus } from "../utils/quick-start-utils";

import "./QuickStartEdit.scss";
import ContributionDetailsForm from "./Forms/QuickStartTileForm";
import TaskDetailsForm from "./Forms/TaskDetailsForm";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "@quickstarts/utils/quick-start-context";
import QuickStartTourForm from "./Forms/QuickStartTileForm copy";
import QuickStartControllerEdit from "@quickstarts/QuickStartControllerEdit";
import TrashIcon from "@patternfly/react-icons/dist/js/icons/trash-icon";
import GripHorizontalIcon from "@patternfly/react-icons/dist/js/icons/grip-horizontal-icon";

type QuickStartEditProps = {
  quickStartId?: string;
  quickStart: QuickStart;
  setQuickStart: Function;
};

const QuickStartEdit: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStart,
  setQuickStart,
}) => {
  const {
    activeQuickStartID,
    allQuickStartStates,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);

  const [activeMenuItem, setActiveMenuItem] = useState(100);
  const [taskNumber, setTaskNumber] = useState(null);
  const handleMenuClick = (event, itemId: number) => {
    setActiveMenuItem(itemId);
    if (itemId < 100) {
      const id = itemId === 99 ? -1 : itemId;
      setTaskNumber(id);
    }
  };

  const updateQuickStart = (newQuickStart: QuickStart) => {
    setQuickStart(newQuickStart);
  };

  const formGenerator = () => {
    switch (activeMenuItem) {
      case 100:
        return <div className="pf-u-font-size-2xl">IBM Quick Starts Help</div>;
      case 101:
        return (
          <ContributionDetailsForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 99:
        return (
          <QuickStartTourForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 102:
        return (
          <TaskDetailsForm
            key="new"
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      default:
        return (
          <TaskDetailsForm
            key={`edit-${activeMenuItem}`}
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
            task={quickStart.spec.tasks[activeMenuItem]}
            index={activeMenuItem}
          />
        );
    }
  };

  const previews = () => {
    // if (activeMenuItem === 102) {
    //   console.log("new task");
    //   return <div>New task</div>;
    // }

    if (activeMenuItem < 100) {
      return (
        <div className="previews">
          <QuickStartControllerEdit
            key={`controller-${activeMenuItem}`}
            quickStart={quickStart}
            taskNumber={taskNumber}
          />
        </div>
      );
    }

    if (activeMenuItem > 100) {
      return (
        <QuickStartTile
          quickStart={quickStart}
          isActive={quickStartId === activeQuickStartID}
          status={getQuickStartStatus(allQuickStartStates, quickStartId)}
          onClick={() => {}}
        />
      );
    }
    return null;
  };

  return (
    <div className="tabs-container">
      {quickStart ? (
        <React.Fragment>
          <Grid hasGutter>
            <GridItem span={12}></GridItem>
            <GridItem span={2}>
              <Menu activeItemId={activeMenuItem} onSelect={handleMenuClick}>
                <MenuList>
                  <MenuItem itemId={100}>Read Me First</MenuItem>
                  <MenuItem itemId={101}>Quick Start Tile Editor</MenuItem>
                  <MenuItem itemId={99}>Quick Start Tour Intro</MenuItem>
                  <MenuItem className="separator" isDisabled={true}>
                    {quickStart.spec.tasks.length} Tasks
                  </MenuItem>
                  {quickStart
                    ? quickStart.spec.tasks.map((task, index) => {
                        return (
                          <MenuItem key={index} itemId={index}>
                            <GripHorizontalIcon className="grip-icon" />
                            {task.title}
                          </MenuItem>
                        );
                      })
                    : null}

                  <MenuItem itemId={102}>Add Task+</MenuItem>
                </MenuList>
              </Menu>
            </GridItem>
            <GridItem span={6}>{formGenerator()}</GridItem>
            <GridItem span={4}>
              {quickStart !== undefined ? (
                <React.Fragment>{previews()}</React.Fragment>
              ) : null}
            </GridItem>
          </Grid>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default QuickStartEdit;
