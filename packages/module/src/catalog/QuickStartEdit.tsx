import React, { useState } from "react";
import { Grid, GridItem } from "@patternfly/react-core";
import "./QuickStartTile.scss";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import QuickStartTile from "./QuickStartTile";

import { getQuickStartStatus } from "../utils/quick-start-utils";

import "./QuickStartEdit.scss";
// import ContributionDetailsForm from "./Forms/QuickStartTileForm";
import TaskDetailsForm from "./Forms/TaskDetailsForm";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "@quickstarts/utils/quick-start-context";
// import QuickStartTourForm from "./Forms/QuickStartTileForm";
import QuickStartControllerEdit from "@quickstarts/QuickStartControllerEdit";
import { QuickStartEditMenu } from "./Forms/QuickStartEditMenu";
import YAML from "json-to-pretty-yaml";
import QuickStartIntroductionForm from "./Forms/QuickStartIntroductionForm";
import QuickStartConclusionForm from "./Forms/QuickStartConclusionForm";
import QuickStartDetailsForm from "./Forms/QuickStartDetailsForm";

type QuickStartEditProps = {
  quickStartId?: string;
  quickStart?: QuickStart;
  setQuickStart: Function;
  setQuickYaml: Function;
};

const QuickStartEdit: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStart,
  setQuickStart,
  setQuickYaml,
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
    console.log("newQuickStart================>>>", newQuickStart);
    setQuickStart(newQuickStart);
    setQuickYaml(YAML.stringify(newQuickStart));
  };

  const formGenerator = () => {
    switch (activeMenuItem) {
      case 100:
        return <div className="pf-u-font-size-2xl">IBM Quick Starts Help</div>;
      case 101:
        return (
          <QuickStartDetailsForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 98:
        return (
          <QuickStartConclusionForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 99:
        return (
          <QuickStartIntroductionForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 102:
        return (
          <TaskDetailsForm
            key="new"
            quickStart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      default:
        return (
          <TaskDetailsForm
            key={`edit-${activeMenuItem}`}
            quickStart={quickStart}
            updateQuickStart={updateQuickStart}
            task={quickStart.spec.tasks[activeMenuItem]}
            index={activeMenuItem}
          />
        );
    }
  };

  const previews = () => {
    if (activeMenuItem < 100 || activeMenuItem === 102) {
      return (
        <div className="previews">
          <QuickStartControllerEdit
            key={`controller-${activeMenuItem}`}
            quickStart={quickStart}
            taskNumber={taskNumber}
          />
        </div>
      );
    } else {
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
      {/* {quickStart ? ( */}
      <React.Fragment>
        <Grid hasGutter>
          <GridItem span={12}></GridItem>
          <GridItem span={3}>
            <QuickStartEditMenu
              activeMenuItem={activeMenuItem}
              handleMenuClick={handleMenuClick}
              quickStart={quickStart}
              updateQuickStart={updateQuickStart}
            />
          </GridItem>
          <GridItem span={6}>{formGenerator()}</GridItem>
          <GridItem span={3}>
            {quickStart !== undefined ? (
              <React.Fragment>{previews()}</React.Fragment>
            ) : null}
          </GridItem>
        </Grid>
      </React.Fragment>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default QuickStartEdit;
