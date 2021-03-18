import React from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Form } from "@patternfly/react-core";

import "./TaskDetailsForm.scss";
import ContributionInput from "./ContributionInput";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

type TaskDetailsFormProps = {
  task?;
  quickStart: QuickStart;
  updateQuickStart: Function;
  index?: number;
};

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  task,
  quickStart,
  updateQuickStart,
  index,
}) => {
  const quickUpdate = (value, e) => {
    const newQuick = { ...quickStart };
    const newTasks = [...newQuick.spec.tasks];
    newTasks[index][value] = e;
    newQuick.spec.tasks = newTasks;
    updateQuickStart(newQuick);
  };

  console.log("task --- ", task);

  return (
    <Form>
      <ContributionInput
        key={`title-${task.title}`}
        initialValue={task ? task.title : ""}
        label={"Task Title Cip"}
        id="task-title"
        value="title"
        textarea={false}
        type="text"
        updateValue={quickUpdate}
      />

      <ContributionInput
        key={`desc-${task.title}`}
        initialValue={task ? task.description : ""}
        label="Description"
        id="description"
        value="description"
        textarea={true}
        type="text"
        updateValue={quickUpdate}
      />

      <div className="pf-u-font-size-lg">Review</div>
      <Split hasGutter>
        <SplitItem>
          <ContributionInput
            key={`inst-${task.title}`}
            initialValue={task ? task.review["instructions"] : ""}
            label="Instructions"
            id="instructions"
            value="instructions"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
        </SplitItem>
        <SplitItem>
          <ContributionInput
            key={`ft-${task.title}`}
            initialValue={task ? task.review["failedTaskHelp"] : ""}
            label="Failed Task"
            id="failed-task-help"
            value="failedTaskHelp"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
        </SplitItem>
      </Split>

      <div className="pf-u-font-size-lg">Summary</div>
      <Split hasGutter>
        <SplitItem>
          <ContributionInput
            key={`success-${task.title}`}
            initialValue={task ? task.summary["success"] : ""}
            label="Success"
            id="success"
            value="success"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
        </SplitItem>
        <SplitItem>
          <ContributionInput
            key={`failed-${task.title}`}
            initialValue={task ? task.summary["failed"] : ""}
            label="Failed"
            id="failed"
            value="failed"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
        </SplitItem>
      </Split>

      {/* <ContributionInput
        key="conclusion"
        initialValue={task ? task.summary : ""}
        label="Conclusion"
        id="conclusion"
        value="conclusion"
        textarea={true}
        type="text"
        updateValue={quickUpdate}
      /> */}
    </Form>
  );
};

export default TaskDetailsForm;
