import React, { useState } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Form } from "@patternfly/react-core";

import "./TaskDetailsForm.scss";
import ContributionInput from "./ContributionInput";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

// type TaskProps = {
//   title: string;
//   description: string;
//   review: object;
//   summary: object;
//   //   conclusion: string;
// };

type TaskDetailsFormProps = {
  task?;
  quickstart: QuickStart;
  updateQuickStart: Function;
  index?: number;
};

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  task,
  quickstart,
  updateQuickStart,
  index,
}) => {
  const quickUpdate = (value, e) => {
    const newQuick = { ...quickstart };
    const newTasks = [...newQuick.spec.tasks];
    newTasks[index][value] = e;
    newQuick.spec.tasks = newTasks;
    updateQuickStart(newQuick);
  };

  return (
    <Form>
      <ContributionInput
        key="title"
        initialValue={task ? task.title : ""}
        label="Task Title"
        id="task-title"
        value="title"
        textarea={false}
        type="text"
        updateValue={quickUpdate}
      />

      <ContributionInput
        key="description"
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
            key="instructions"
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
            key="failed-task"
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
            key="success"
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
            key="failed"
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
