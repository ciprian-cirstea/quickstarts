import * as React from "react";
// import { useTranslation } from "react-i18next";
import { Button, Text } from "@patternfly/react-core";
import DownloadIcon from "@patternfly/react-icons/dist/js/icons/download-icon";
import YAML from "json-to-pretty-yaml";

import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";
import QuickStartEditComponent from "./catalog/QuickStartEditComponent";
import { QuickStart } from "./utils/quick-start-types";

type QuickStartEditPageProps = {
  match?: any;
};

export const QuickStartEditPage: React.FC<QuickStartEditPageProps> = (
  props
) => {
  //   const { t } = useTranslation();
  const {
    match: { params },
  } = props;

  const { allQuickStarts } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );

  const [quickYaml, setQuickYaml] = React.useState(undefined);
  const [quickStart, setQuickStart] = React.useState(undefined);
  const [pageType, setPageType] = React.useState("Edit");
  const [errors, setErrors] = React.useState({});
  const [taskErrors, setTaskErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const { global } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );
  const onCloseLinkClick = global?.onCloseLinkClick;

  React.useEffect(() => {
    if (location.pathname === "/quickstarts/add") {
      setPageType("Add");

      const id = Date.now();
      //   createStorageQuickStarts(true, random, null);
      const qs = {
        apiVersion: "console.openshift.io/v1",
        kind: "ConsoleQuickStart",
        metadata: { name: id },
        spec: {
          conclusion: "",
          description: "",
          displayName: "",
          durationMinutes: "",
          icon: "",
          introduction: "",
          nextQuickStart: [],
          prerequisites: [],
          tasks: [],
          version: "",
        },
      };

      setQuickStart(qs);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const quickEdit = allQuickStarts.find((data) => {
      return data.metadata.name.toString() === params.quickstartsId;
    });

    if (quickEdit && pageType === "Edit") {
      setQuickStart(quickEdit);
      setQuickYaml(YAML.stringify(quickEdit));
    }
  }, []);

  const createStorageQuickStarts = (
    add: boolean,
    id: string,
    quickStart: QuickStart
  ) => {
    let quickStartId = id;

    let quickStartObject = quickStart;

    let lSQuickstarts = JSON.parse(localStorage.getItem("newQuickStarts"));
    if (lSQuickstarts === null) {
      localStorage.setItem("newQuickStarts", JSON.stringify({}));
    }

    lSQuickstarts = JSON.parse(localStorage.getItem("newQuickStarts"));

    lSQuickstarts[quickStartId] = quickStartObject;

    localStorage.setItem("newQuickStarts", JSON.stringify(lSQuickstarts));
  };

  const saveQuickStart = () => {
    setSubmitted(true);
    const qSspecs = quickStart.spec;
    const qSTasks = quickStart.spec.tasks;

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

    const requiredTasks = [
      "title",
      "description",
      "instructions",
      "failedTaskHelp",
      "success",
      "failed",
    ];

    for (let k in qSspecs) {
      const spec = qSspecs[k].toString();
      if (required.includes(k) && spec.length === 0 && spec === "") {
        setErrors((prevErrors) => ({ ...prevErrors, [k]: true }));
      }
    }

    let newTaskErrors = {};

    for (let index = 0; index < qSTasks.length; index++) {
      const task = qSTasks[index];
      newTaskErrors[index] = {};

      for (let k in task) {
        if (typeof task[k] === "object" && task[k] !== null) {
          const taskObject = task[k];

          for (let key in taskObject) {
            const taskVal = taskObject[key];
            if (
              requiredTasks.includes(key) &&
              (taskVal.length === 0 || taskVal === "")
            ) {
              newTaskErrors[index][key] = true;
            }
          }
        } else {
          if (
            requiredTasks.includes(k) &&
            (task[k].length === 0 || task[k] === "")
          ) {
            newTaskErrors[index][k] = true;
          }
        }
      }
    }

    setTaskErrors(newTaskErrors);

    if (Object.keys(errors).length === 0) {
      const quickStartId = quickStart.metadata.name;
      createStorageQuickStarts(false, quickStartId, quickStart);
    } else {
      console.log("Fix errors!");
    }
  };

  const downloadYAML = () => {
    const fileName = `${quickStart.metadata.name}.yaml`;
    const fileType = "text/yaml";

    const blob = new Blob([quickYaml], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
  };

  return (
    <React.Fragment>
      <div className="ocs-page-layout__header">
        <Text component="h1" className="ocs-page-layout__title">
          {pageType} Quick Start
          {onCloseLinkClick && (
            <Button
              onClick={onCloseLinkClick}
              variant="secondary"
              className="float-right close-button" //TODO use float right class from patternfly
            >
              Close
            </Button>
          )}
          <Button
            onClick={() => {
              saveQuickStart();
              //   onCloseLinkClick();
            }}
            className="float-right add-new-button"
            variant="primary"
          >
            Save
          </Button>
          <Button
            className="float-right add-new-button"
            variant="link"
            onClick={downloadYAML}
            icon={<DownloadIcon />}
          >
            Download YAML
          </Button>
        </Text>
      </div>

      <QuickStartEditComponent
        quickStart={quickStart}
        setQuickStart={setQuickStart}
        quickStartId={params.quickstartsId}
        setQuickYaml={setQuickYaml}
        errors={errors}
        setErrors={setErrors}
        taskErrors={taskErrors}
        setTaskErrors={setTaskErrors}
        submitted={submitted}
      />
    </React.Fragment>
  );
};
