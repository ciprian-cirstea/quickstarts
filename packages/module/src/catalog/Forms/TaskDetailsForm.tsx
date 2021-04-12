import React from "react";
import { Split, SplitItem, Checkbox } from "@patternfly/react-core";

import "./TaskDetailsForm.scss";
import FormInput from "./FormInput";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import DescriptionComponent from "./DescriptionComponent";

type TaskDetailsFormProps = {
  task?;
  quickStart: QuickStart;
  updateQuickStart: Function;
  index?: number;
  handleMenuClick: Function;
  submitted: boolean;
  taskErrors: object;
  setTaskErrors: Function;
};

const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  task,
  quickStart,
  updateQuickStart,
  index,
  handleMenuClick,
  submitted,
  taskErrors,
  setTaskErrors,
}) => {
  const [qs, setQs] = React.useState(quickStart);
  const [taskIndex, setTaskIndex] = React.useState(index ? index : 0);

  React.useEffect(() => {
    //If no task is passed create a new empty task
    if (!task) {
      const newQuick = { ...qs };

      const newTasksArray = [...newQuick.spec.tasks];

      newTasksArray.splice(0, 0, {
        title: "",
        summary: { failed: "", success: "" },
        description: "",
        active: true,
        review: { instructions: "", failedTaskHelp: "" },
      });

      newQuick.spec.tasks = newTasksArray;
      setQs(newQuick);
      handleMenuClick(null, 0);
    }
  }, []);

  const quickUpdate = (value: string, e: any) => {
    const newTsk = [...qs.spec.tasks];
    if (value === "instructions" || value === "failedTaskHelp") {
      newTsk[taskIndex].review[value] = e;
    } else if (value === "success" || value === "failed") {
      newTsk[taskIndex].summary[value] = e;
    } else {
      newTsk[taskIndex][value] = e;
    }

    qs.spec.tasks = newTsk;

    updateQuickStart(qs, taskIndex);
  };

  const deactivateTask = () => {
    const status = !task.active;
    quickUpdate("active", status);
  };

  const checkboxWithDescription = () => (
    <Checkbox
      label="Active"
      isChecked={task?.active}
      onChange={deactivateTask}
      aria-label="controlled checkbox example"
      id="deactivate-task"
      name="deactivate-task"
    />
  );

  return (
    <React.Fragment>
      <FormInput
        // key={`title-${task?.title}`}
        initialValue={task?.title}
        label={"Task Title"}
        id="task-title"
        value="title"
        textarea={false}
        type="text"
        updateValue={quickUpdate}
        submitted={submitted}
        errors={taskErrors[taskIndex]}
      />

      {/* <div className="deactivate-checkbox">{checkboxWithDescription()}</div> */}

      <DescriptionComponent
        key="description"
        initialValue={task?.description}
        label="Description"
        id="description"
        value="description"
        textarea={true}
        type="text"
        updateValue={quickUpdate}
        submitted={submitted}
        errors={taskErrors[taskIndex]}
      />

      {/* <div className="pf-u-font-size-lg">Review</div> */}
      {/* <Split hasGutter>
        <SplitItem>
          <FormInput
            initialValue={task?.review["instructions"]}
            label="Instructions"
            id="instructions"
            value="instructions"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
            submitted={submitted}
            errors={taskErrors[taskIndex]}
          />
        </SplitItem>

        <SplitItem>
          <FormInput
            // key={`ft-${task?.review["failedTaskHelp"]}`}
            initialValue={task?.review["failedTaskHelp"]}
            label="Failed Task"
            id="failed-task-help"
            value="failedTaskHelp"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
            submitted={submitted}
            errors={taskErrors[taskIndex]}
          />
        </SplitItem>
      </Split> */}

      {/* <div className="pf-u-font-size-lg">Summary</div> */}
      {/* <Split hasGutter>
        <SplitItem>
          <FormInput
            initialValue={task?.summary["success"]}
            label="Success"
            id="success"
            value="success"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
            submitted={submitted}
            errors={taskErrors[taskIndex]}
          />
        </SplitItem>
        <SplitItem>
          <FormInput
            // key={`failed-${task?.summary["failed"]}`}
            initialValue={task?.summary["failed"]}
            label="Failed"
            id="failed"
            value="failed"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
            submitted={submitted}
            errors={taskErrors[taskIndex]}
          />
        </SplitItem>
      </Split> */}
    </React.Fragment>
  );
};

export default TaskDetailsForm;
