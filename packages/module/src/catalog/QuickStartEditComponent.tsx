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
  errors: object;
  setErrors;
  submitted: boolean;
};

const QuickStartEditComponent: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStart,
  setQuickStart,
  setQuickYaml,
  errors,
  submitted,
  setErrors,
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
    console.log("newQuickStart", newQuickStart);
    const qSspecs = newQuickStart.spec;
    const required = [
      "conclusion",
      "description",
      "displayName",
      "durationMinutes",
      "icon",
      "introduction",
      "prerequisites",
      "tasks",
      "version",
      "introduction",
    ];
    const err = { ...errors };

    for (let k in qSspecs) {
      if (qSspecs.hasOwnProperty(k)) {
        const spec = qSspecs[k];

        console.log(spec);

        if (spec !== "" || spec.length > 0) {
          console.log("kkk 0000000000000", k);
          console.log("errors !!!!!!!!!!!!!!!!!!", errors);
          //   console.log("spec 0000000000000", spec);
          //   console.log("length 00000000000000", spec.length);
          //   const err = { ...errors };
          delete err[k];
          //   setErrors(err);
        } else {
          //   console.log("spec 11111111111", spec);
          //   console.log("kkk  11111111111", k);
          //   console.log("length 1111111111", spec.length);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [k]: true,
          }));
        }
      }
    }
    console.log("err??????????????????????", err);

    setErrors(err);
    setQuickStart(newQuickStart);
    setQuickYaml(YAML.stringify(newQuickStart));
  };

  const formGenerator = () => {
    // console.log("FORM GEN ERRORS -------- ", errors);
    switch (activeMenuItem) {
      case 100:
        return <div className="pf-u-font-size-2xl">IBM Quick Starts Help</div>;
      case 101:
        return (
          <QuickStartDetailsForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
            errors={errors}
            submitted={submitted}
          />
        );
      case 98:
        return (
          <QuickStartConclusionForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
            errors={errors}
            submitted={submitted}
          />
        );
      case 99:
        return (
          <QuickStartIntroductionForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
            errors={errors}
            submitted={submitted}
          />
        );
      case 102:
        return (
          <TaskDetailsForm
            key="new"
            quickStart={quickStart}
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
