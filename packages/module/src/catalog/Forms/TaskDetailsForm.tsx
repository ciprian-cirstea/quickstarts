import React from "react";
import { Split, SplitItem, Checkbox } from "@patternfly/react-core";
import { Form } from "@patternfly/react-core";

import "./TaskDetailsForm.scss";
import FormInput from "./FormInput";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

type TaskDetailsFormProps = {
  task?;
  quickStart: QuickStart;
  updateQuickStart: Function;
  index?: number;
  handleMenuClick: Function;
};

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  task,
  quickStart,
  updateQuickStart,
  index,
  handleMenuClick,
}) => {
  console.log("quickStart 102", quickStart);

  const [qs, setQs] = React.useState(quickStart);
  //   const [newTasks, setNewTasks] = React.useState([]);
  const [taskIndex, setTaskIndex] = React.useState(index ? index : 0);

  React.useEffect(() => {
    if (!task) {
      console.log("NO TASK !!!!!!!!!!!!!!!!!!!!!!!");
      const newQuick = { ...qs };

      const newTasksArray = [...newQuick.spec.tasks];

      newTasksArray.splice(0, 0, {
        title: "",
        summary: { failed: "", success: "" },
        description: "",
        review: { instructions: "", failedTaskHelp: "" },
      });

      newQuick.spec.tasks = newTasksArray;
      setQs(newQuick);
      handleMenuClick(null, 0);
    }
  }, []);

  const quickUpdate = (value: string, e: string) => {
    const newTsk = [...qs.spec.tasks];
    // console.log("newTsk", newTsk);
    // console.log("indexxxxxxx", taskIndex);

    if (value === "instructions" || value === "failedTaskHelp") {
      newTsk[taskIndex].review[value] = e;
    } else if (value === "success" || value === "failed") {
      newTsk[taskIndex].summary[value] = e;
    } else {
      newTsk[taskIndex][value] = e;
    }
    qs.spec.tasks = newTsk;
    updateQuickStart(qs, true);
  };

  return (
    <React.Fragment>
      <FormInput
        // key={`title-${task?.title}`}
        initialValue={task ? task.title : ""}
        label={"Task Title"}
        id="task-title"
        value="title"
        textarea={false}
        type="text"
        updateValue={quickUpdate}
      />

      <FormInput
        // key={`desc-${task?.description}`}
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
          <FormInput
            // key={`inst-${task?.review["instructions"]}`}
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
          <FormInput
            // key={`ft-${task?.review["failedTaskHelp"]}`}
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

      <div className="pf-u-font-size-lg">Active</div>
      <Checkbox
        label="Uncontrolled CheckBox"
        aria-label="uncontrolled checkbox example"
        id="check-5"
      />
      <div className="pf-u-font-size-lg">Summary</div>
      <Split hasGutter>
        <SplitItem>
          <FormInput
            // key={`success-${task?.summary["success"]}`}
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
          <FormInput
            // key={`failed-${task?.summary["failed"]}`}
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
    </React.Fragment>
  );
};

export default TaskDetailsForm;
