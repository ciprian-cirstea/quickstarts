import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Menu,
  MenuList,
  MenuItem,
} from "@patternfly/react-core";
// import {
//   Form,
//   FormGroup,
//   TextArea,
//   ActionGroup,
//   Button,
// } from "@patternfly/react-core";
import "./QuickStartTile.scss";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import QuickStartTile from "./QuickStartTile";
// import YAML from "json-to-pretty-yaml";
// import * as YAML2JSON from "yamljs";
// import DownloadIcon from "@patternfly/react-icons/dist/js/icons/download-icon";

import {
  getQuickStartStatus,
  //   getQuickStartStatusCount,
  //   filterQuickStarts,
} from "../utils/quick-start-utils";

import "./QuickStartEdit.scss";
import ContributionDetailsForm from "./Forms/QuickStartTileForm";
import TaskDetailsForm from "./Forms/TaskDetailsForm";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "@quickstarts/utils/quick-start-context";
import QuickStartTourForm from "./Forms/QuickStartTileForm copy";
import QuickStartControllerEdit from "@quickstarts/QuickStartControllerEdit";
// import QuickStartController from "@quickstarts/QuickStartController";

type QuickStartEditProps = {
  quickStartId?: string;
  //   quickStarts: QuickStart[];
  //   allQuickStartStates;
  quickStart: QuickStart;
  setQuickStart: Function;
};

const QuickStartEdit: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStart,
  setQuickStart,
  //   allQuickStartStates,
}) => {
  const {
    activeQuickStartID,
    allQuickStartStates,
    setActiveQuickStart,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);
  const [tabIndex, setTabIndex] = useState(0);
  //   const [quickStart, setQuickStart] = useState(undefined);
  //   const [quickYaml, setQuickYaml] = useState(undefined);
  const [activeMenuItem, setActiveMenuItem] = useState(100);

  React.useEffect(() => {
    // const quickEdit = quickStarts.find((data) => {
    //   return data.metadata.name === quickStartId;
    // });
    // if (quickEdit) {
    //   setQuickStart(quickEdit);
    //   setQuickYaml(YAML.stringify(quickEdit));
    // }
  }, []);

  //   const handleTabClick = (event, tabIndex: number) => setTabIndex(tabIndex);

  const handleMenuClick = (event, itemId: number) => {
    console.log(itemId);
    setActiveMenuItem(itemId);
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
    console.log("previewssssss==============>", activeMenuItem);

    // if (activeMenuItem === 102) {
    //   console.log("new task");
    //   return <div>New task</div>;
    // }

    if (activeMenuItem < 100) {
      return (
        <QuickStartControllerEdit
          key={`controller-${activeMenuItem}`}
          quickStart={quickStart}
        />
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
      {console.log("quickStart -----", quickStart)}
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

                  {quickStart
                    ? quickStart.spec.tasks.map((task, index) => {
                        return (
                          <MenuItem key={index} itemId={index}>
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
