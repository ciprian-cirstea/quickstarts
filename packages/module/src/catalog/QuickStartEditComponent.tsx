import React, { useState } from "react";
import { Grid, GridItem } from "@patternfly/react-core";
import "./QuickStartTile.scss";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import QuickStartTile from "./QuickStartTile";

import { getQuickStartStatus } from "../utils/quick-start-utils";

import "./QuickStartEditComponent.scss";

import TaskDetailsForm from "./Forms/TaskDetailsForm";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "@quickstarts/utils/quick-start-context";

import QuickStartControllerEdit from "@quickstarts/QuickStartControllerEdit";
import { QuickStartEditMenu } from "./Forms/QuickStartEditMenu";
import YAML from "json-to-pretty-yaml";
import QuickStartIntroductionForm from "./Forms/QuickStartIntroductionForm";
import QuickStartConclusionForm from "./Forms/QuickStartConclusionForm";
import QuickStartDetailsForm from "./Forms/QuickStartDetailsForm";
import { Form } from "@patternfly/react-core/dist/js/components";

type QuickStartEditProps = {
  quickStartId?: string;
  quickStart?: QuickStart;
  setQuickStart: Function;
  setQuickYaml: Function;
};

const QuickStartEditComponent: React.FC<QuickStartEditProps> = ({
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
    console.log("itemId", itemId);
    if (itemId < 100) {
      const id = itemId === 99 ? -1 : itemId;
      setTaskNumber(id);
    }
  };

  const updateQuickStart = (newQuickStart: QuickStart) => {
    setQuickStart(newQuickStart);
    setQuickYaml(YAML.stringify(newQuickStart));
  };

  const deactivateQuickstart = () => {
    const newQ = { ...quickStart };
    if (newQ.hasOwnProperty("inactive")) {
      delete newQ["inactive"];
    } else {
      newQ["inactive"] = true;
    }
    setQuickStart(newQ);
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
            deactivateQuickstart={deactivateQuickstart}
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
            // task={quickStart.spec.tasks[activeMenuItem]}
            updateQuickStart={updateQuickStart}
            handleMenuClick={handleMenuClick}
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
            handleMenuClick={handleMenuClick}
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
          <GridItem span={6}>
            <Form>{formGenerator()}</Form>
          </GridItem>
          <GridItem span={3}>
            {quickStart !== undefined ? (
              <React.Fragment>{previews()}</React.Fragment>
            ) : null}
          </GridItem>
        </Grid>
      </React.Fragment>
    </div>
  );
};

export default QuickStartEditComponent;
