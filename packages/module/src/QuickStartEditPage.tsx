import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "@patternfly/react-core";
import QuickStartEdit from "./catalog/QuickStartEdit";
import DownloadIcon from "@patternfly/react-icons/dist/js/icons/download-icon";
import YAML from "json-to-pretty-yaml";

import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";

type QuickStartEditPageProps = {
  match?: any;
};

export const QuickStartEditPage: React.FC<QuickStartEditPageProps> = (
  props
) => {
  const { t } = useTranslation();
  const {
    match: { params },
  } = props;
  const {
    allQuickStartStates,
    allQuickStarts,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);

  const [quickYaml, setQuickYaml] = React.useState(undefined);
  const [quickStart, setQuickStart] = React.useState(undefined);
  const [pageType, setPageType] = React.useState("Edit");
  const { global } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );
  const onCloseLinkClick = global?.onCloseLinkClick;

  React.useEffect(() => {
    if (location.pathname === "/quickstarts/add") {
      setPageType("Add");
      const random = Math.floor(Math.random() * Math.floor(20)).toString();
      createStorageQuickStarts(true, random, null);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const quickEdit = allQuickStarts.find((data) => {
      return data.metadata.name === params.quickstartsId;
    });
    if (quickEdit && pageType === "Edit") {
      setQuickStart(quickEdit);
      setQuickYaml(YAML.stringify(quickEdit));
    }
  }, []);

  const createStorageQuickStarts = (add: boolean, id: string, quickStart) => {
    let quickStartId = id;

    let quickStartObject = quickStart;

    let lSQuickstarts = JSON.parse(localStorage.getItem("newQuickStarts"));
    if (lSQuickstarts === null) {
      localStorage.setItem("newQuickStarts", JSON.stringify({}));
    }

    lSQuickstarts = JSON.parse(localStorage.getItem("newQuickStarts"));

    //empty quickstart template
    const qs = {
      apiVersion: "console.openshift.io/v1",
      kind: "ConsoleQuickStart",
      metadata: { name: quickStartId },
      spec: {
        conclusion: "",
        description: "",
        displayName: "",
        durationMinutes: null,
        icon: "",
        introduction: "",
        nextQuickStart: [],
        prerequisites: [],
        tasks: [],
        version: 4.7,
      },
    };

    if (add) {
      quickStartObject = qs;
    }

    lSQuickstarts[quickStartId] = quickStartObject;

    localStorage.setItem("newQuickStarts", JSON.stringify(lSQuickstarts));

    if (add) {
      setQuickStart(qs);
    }
  };

  const saveQuickStart = () => {
    console.log("---------------------------------");
    console.log("save stuff here");
    const quickStartId = quickStart.metadata.name;
    let add = false;
    if (pageType === "Edit") {
      createStorageQuickStarts(false, quickStartId, quickStart);
    }
  };

  const downloadYAML = () => {
    // var decodedString = atob(quickYaml);

    var fileName = `${quickStart.metadata.name}.yaml`;
    var fileType = "text/yaml";

    var blob = new Blob([quickYaml], { type: fileType });

    var a = document.createElement("a");
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
    <>
      <div className="ocs-page-layout__header">
        <Text component="h1" className="ocs-page-layout__title">
          {pageType} quickstart
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
              onCloseLinkClick();
            }}
            // onClick={saveQuickStart }
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

      {/* {quickStart && ( */}
      <QuickStartEdit
        quickStart={quickStart}
        setQuickStart={setQuickStart}
        quickStartId={params.quickstartsId}
        setQuickYaml={setQuickYaml}
        //   allQuickStartStates={allQuickStartStates}
      />
      {/* )} */}
    </>
  );
};
