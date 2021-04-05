import React, { useState } from "react";
import { Grid, GridItem, Alert } from "@patternfly/react-core";
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
  setErrors: Function;
  taskErrors: object;
  setTaskErrors: Function;
  submitted: boolean;
};

const QuickStartEditComponent: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStart,
  setQuickStart,
  setQuickYaml,
  errors,
  setErrors,
  taskErrors,
  setTaskErrors,
  submitted,
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

  // Used to delete or add errors when typing
  const updateQuickStart = (newQuickStart: QuickStart, index: number) => {
    const qSspecs = newQuickStart.spec;
    const qSTasks = newQuickStart.spec.tasks[index];

    let err = { ...errors };

    for (let k in qSspecs) {
      if (qSspecs?.hasOwnProperty(k)) {
        const spec = qSspecs[k]?.toString();
        if (spec !== "" && spec.length > 0) {
          delete err[k];
        } else {
          err = { ...err, [k]: true };
        }
      }
    }

    let taskErr = { ...taskErrors };

    for (let k in qSTasks) {
      if (qSTasks?.hasOwnProperty(k)) {
        const taskValue = qSTasks[k];

        if (typeof taskValue === "object" && taskValue !== null) {
          for (let key in taskValue) {
            const value = taskValue[key];
            if (
              value != "" &&
              value.length > 0 &&
              taskErr[index] &&
              taskErr[index]?.hasOwnProperty(key)
            ) {
              delete taskErr[index][key];
            }
          }
        } else if (submitted) {
          if (
            taskValue != "" ||
            (taskValue.length > 0 &&
              taskErr[index] &&
              taskErr[index]?.hasOwnProperty(k))
          ) {
            delete taskErr[index][k];
          } else {
            taskErr[index][k] = true;
          }
        }
      }
    }

    setErrors(err);
    setTaskErrors(taskErr);
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
            submitted={submitted}
            taskErrors={taskErrors}
            setTaskErrors={setTaskErrors}
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
            submitted={submitted}
            taskErrors={taskErrors}
            setTaskErrors={setTaskErrors}
          />
        );
    }
  };

  const previews = () => {
    if (activeMenuItem === 98) {
      return (
        <div className="previews">
          <div className="co-quick-start-content">
            {quickStart.spec.conclusion}
          </div>
          <div className="co-quick-start-footer">
            <button
              aria-disabled="false"
              className="pf-c-button pf-m-primary"
              type="submit"
              data-ouia-component-type="PF4/Button"
              data-ouia-safe="true"
              data-ouia-component-id="OUIA-Generated-Button-primary-3"
              // style="margin-right: var(--pf-global--spacer--md);"
            >
              Start tour
            </button>
            <button
              aria-disabled="false"
              className="pf-c-button pf-m-secondary"
              type="submit"
              data-ouia-component-type="PF4/Button"
              data-ouia-safe="true"
              data-ouia-component-id="OUIA-Generated-Button-secondary-2"
              // style="margin-right: var(--pf-global--spacer--md);"
            >
              Back
            </button>
          </div>
        </div>
      );
    } else if (activeMenuItem < 100 || activeMenuItem === 102) {
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
  };

  const checkTaskErrors = () => {
    for (let k in taskErrors) {
      const el = taskErrors[k];
      if (Object.keys(el).length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="tabs-container">
      <React.Fragment>
        <Grid hasGutter>
          <GridItem span={12}></GridItem>
          <GridItem span={3}>
            <QuickStartEditMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              handleMenuClick={handleMenuClick}
              quickStart={quickStart}
              updateQuickStart={updateQuickStart}
              errors={errors}
              taskErrors={taskErrors}
              setTaskErrors={setTaskErrors}
              submitted={submitted}
            />
          </GridItem>
          <GridItem span={6}>
            {(Object.keys(errors).length > 0 || checkTaskErrors()) &&
            submitted ? (
              <Alert
                variant="danger"
                title="Please fix form errors before continuing"
              />
            ) : null}
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
