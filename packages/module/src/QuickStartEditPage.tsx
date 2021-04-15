import * as React from "react";
import { Button, Text, Spinner } from "@patternfly/react-core";
import DownloadIcon from "@patternfly/react-icons/dist/js/icons/download-icon";
import YAML from "json-to-pretty-yaml";

import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";
import QuickStartEditComponent from "./catalog/QuickStartEditComponent";
import { QuickStart } from "./utils/quick-start-types";

import "./QuickStartEditPage.scss";

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

  //   const [quickYaml, setQuickYaml] = React.useState(undefined);
  const [quickStart, setQuickStart] = React.useState(undefined);
  const [pageType, setPageType] = React.useState("Edit");
  const [errors, setErrors] = React.useState({});
  const [taskErrors, setTaskErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [saveLabel, setSaveLabel] = React.useState("Save");
  const { footer } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );
  const onShowAllLinkClick = footer?.onShowAllLinkClick;
  const documentHubApi = "https://developer.ibm.com/edge/documenthub/api";
  const catalogId = "emqnkgHx";
  const quickStartUrlId = window.location.pathname.split("/").pop();

  React.useEffect(() => {
    if (location.pathname === "/add") {
      setPageType("Add");

      const id = Date.now();
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
      setLoading(false);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    let isMounted = true;

    if (location.pathname.includes("/edit")) {
      getData(
        `${documentHubApi}/catalogs/${catalogId}/documents/${params.quickstartsId}`
      )
        .then((response) => {
          if (isMounted) {
            if (response && response.document) {
              const qs = {
                apiVersion: "console.openshift.io/v1",
                kind: "ConsoleQuickStart",
                metadata: { name: response.catalog.document.documentId },
                spec: {
                  conclusion: "",
                  description: response.document.description,
                  displayName: response.document.title,
                  durationMinutes: response.document.duration,
                  icon: "",
                  introduction: "",
                  nextQuickStart: [],
                  prerequisites: [],
                  tasks: [],
                  version: "",
                },
              };

              getData(
                `${documentHubApi}/catalogs/${catalogId}/documents/${response.catalog.document.documentId}/contents/all`
              ).then((tasks) => {
                for (let index = 0; index < tasks.length; index++) {
                  const task = tasks[index];
                  qs.spec.tasks.push({
                    title: task.file.replace(".md", "").substring(2).trim(),
                    description: task.content,
                  });
                }
                setQuickEditHook(qs);
                setLoading(false);
              });
            } else {
              getFromAllQuickstarts();
            }
          }
        })
        .catch((err) => console.log("Error - " + err));
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const setQuickEditHook = (quickEdit) => {
    const newQuickEdit = JSON.parse(JSON.stringify(quickEdit));
    // if (newQuickEdit && pageType === "Edit") {
    setQuickStart(newQuickEdit);
    // setQuickYaml(YAML.stringify(newQuickEdit));
    // }
  };

  const getFromAllQuickstarts = () => {
    const quickEdit = allQuickStarts.find((data) => {
      return data.metadata.name.toString() === params.quickstartsId;
    });
    setQuickEditHook(quickEdit);
    setLoading(false);
  };

  const isError = (value) => {
    const type = typeof value;

    if (type === "string" && value === "") {
      return true;
    }

    if (type === "object" && Object.keys(value).length === 0) {
      return true;
    }

    if (type === undefined) {
      return true;
    }

    if (type === "number" && value === 0) {
      return true;
    }

    return false;
  };

  //   const isError = (value) => {
  //     const type = typeof value;

  //     if (!value && !type) {
  //       console.log("value", value);
  //       debugger;
  //       return true;
  //     }

  //     if (type === "object" && Object.keys(value).length === 0) {
  //       console.log("value", value);
  //       debugger;
  //       return true;
  //     }

  //     // if (!type) {
  //     //   console.log("value", value);
  //     //   debugger;
  //     //   return true;
  //     // }

  //     // if (type === "number" && !value) {
  //     //   console.log("value", value);
  //     //   debugger;
  //     //   return true;
  //     // }

  //     return false;
  //   };

  const saveQuickStart = () => {
    setSubmitted(true);
    setSaveLabel("Saving ...");
    setErrors({});
    let err = false;
    const qSspecs = quickStart.spec;
    const qSTasks = quickStart.spec.tasks;
    const required = ["description", "displayName", "durationMinutes"];
    const requiredTasks = ["title", "description"];

    for (let k in qSspecs) {
      const spec = qSspecs[k];

      if (required.includes(k) && isError(spec)) {
        console.log("spec error", spec, k, "isError", isError(spec));
        err = true;
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
            if (requiredTasks.includes(key) && isError(taskVal)) {
              console.log("task error", taskVal, key);
              err = true;
              newTaskErrors[index][key] = true;
            }
          }
        } else {
          if (requiredTasks.includes(k) && isError(task[k])) {
            console.log("task error 2", task[k], k);
            err = true;
            newTaskErrors[index][k] = true;
          }
        }
      }
    }
    console.log(newTaskErrors);
    setTaskErrors(newTaskErrors);

    if (!err) {
      const quickStartId = location.pathname.includes("/quickstarts/edit")
        ? quickStartUrlId
        : "doc-" + Date.now();

      const caasApi = "https://developer.ibm.com/edge/documenthub/api";
      const caasStarterData = {};
      const caasStarterTasks = quickStart.spec.tasks;
      caasStarterData["title"] = quickStart.spec.displayName;
      caasStarterData["description"] = quickStart.spec.description;
      caasStarterData["duration"] = quickStart.spec.durationMinutes;

      postData(
        `${caasApi}/catalogs/emqnkgHx/documents/${quickStartId}`,
        JSON.stringify(caasStarterData)
      ).then((response) => {
        if (
          response.message.length &&
          response.message === "Document write success"
        ) {
          setTimeout(() => {
            if (caasStarterTasks.length) {
              for (let index = 0; index < caasStarterTasks.length; index++) {
                const task = caasStarterTasks[index];

                console.log("Timeout create document", task);
                postFile(
                  `${caasApi}/catalogs/emqnkgHx/documents/${quickStartId}/files?file=0${
                    index + 1
                  } ${task.title.trim()}.md`,
                  task.description
                ).then((response) => {
                  console.log("response md create", response);
                });
              }
            }
          }, 3000);

          // onShowAllLinkClick();
        }
      });
    } else {
      setSaveLabel("Save");
    }
  };

  async function postData(url: string = "", data: any) {
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data, // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log(err);
    }
  }

  async function postFile(url: string = "", data: any) {
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "text/plain",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data, // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log(err);
    }
  }

  async function getData(url: string = "") {
    try {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      if (response.status === 404) {
        return false;
      } else {
        return response.json(); // parses JSON response into native JavaScript objects
      }
    } catch (err) {
      console.log(err);
    }
  }

  //   const downloadYAML = () => {
  //     const fileName = `${quickStart.metadata.name}.yaml`;
  //     const fileType = "text/yaml";

  //     const blob = new Blob([quickYaml], { type: fileType });

  //     const a = document.createElement("a");
  //     a.download = fileName;
  //     a.href = URL.createObjectURL(blob);
  //     a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  //     a.style.display = "none";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     setTimeout(function () {
  //       URL.revokeObjectURL(a.href);
  //     }, 1500);
  //   };

  return (
    <React.Fragment>
      <div className="ocs-page-layout__header">
        <Text component="h1" className="ocs-page-layout__title">
          {pageType} Document
          {onShowAllLinkClick && (
            <Button
              onClick={onShowAllLinkClick}
              variant="secondary"
              className="float-right close-button" //TODO use float right class from patternfly
            >
              Close
            </Button>
          )}
          <Button
            onClick={() => saveQuickStart()}
            className="float-right add-new-button"
            variant="primary"
          >
            {saveLabel}
          </Button>
          {/* <Button
            className="float-right add-new-button"
            variant="link"
            onClick={downloadYAML}
            icon={<DownloadIcon />}
          >
            Download YAML
          </Button> */}
        </Text>
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-box">
            <Spinner />
          </div>
        </div>
      ) : (
        <QuickStartEditComponent
          quickStart={quickStart}
          setQuickStart={setQuickStart}
          quickStartId={params.quickstartsId}
          //   setQuickYaml={setQuickYaml}
          errors={errors}
          setErrors={setErrors}
          taskErrors={taskErrors}
          setTaskErrors={setTaskErrors}
          submitted={submitted}
        />
      )}
    </React.Fragment>
  );
};
