import * as React from "react";
import { useTranslation } from "react-i18next";
import QuickStartMarkdownView from "../QuickStartMarkdownView";
import {
  QuickStartTask,
  QuickStartTaskStatus,
} from "../utils/quick-start-types";
import TaskHeader from "./QuickStartTaskHeader";
import QuickStartTaskReview from "./QuickStartTaskReview";

type QuickStartTaskProps = {
  tasks: QuickStartTask[];
  taskNumber: number;
  allTaskStatuses: QuickStartTaskStatus[];
  onTaskReview: (reviewState: QuickStartTaskStatus) => void;
  onTaskSelect: (activeQuickStartId) => void;
};

const QuickStartTasks: React.FC<QuickStartTaskProps> = ({
  tasks,
  taskNumber,
  allTaskStatuses,
  onTaskReview,
  onTaskSelect,
}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {tasks
        .filter((_, index) => index <= taskNumber)
        .map((task, index) => {
          const { title, description, review, summary } = task;
          const isActiveTask = index === taskNumber;
          const taskStatus = allTaskStatuses[index];
          const summaryInstructions =
            taskStatus === QuickStartTaskStatus.SUCCESS
              ? summary?.success
              : summary?.failed;
          const taskInstructions = isActiveTask
            ? description
            : summaryInstructions;

          return (
            <React.Fragment key={index}>
              <TaskHeader
                taskIndex={index + 1}
                title={title}
                size="md"
                subtitle={t(
                  "quickstart~{{index, number}} of {{tasks, number}}",
                  {
                    index: index + 1,
                    tasks: tasks.length,
                  }
                )}
                taskStatus={taskStatus}
                isActiveTask={isActiveTask}
                onTaskSelect={onTaskSelect}
              />
              <QuickStartMarkdownView content={taskInstructions} />
              {
                isActiveTask &&
                taskStatus !== QuickStartTaskStatus.INIT &&
                review && (
                  <QuickStartTaskReview
                    review={review}
                    taskStatus={taskStatus}
                    onTaskReview={onTaskReview}
                  />
                )}
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default QuickStartTasks;
