import * as React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "@console/internal/components/utils";
import { Button, Text } from "@patternfly/react-core";
import QuickStartCatalog from "./catalog/QuickStartCatalog";
import QuickStartsLoader from "./loader/QuickStartsLoader";
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
  const [pageType, setPageType] = React.useState('Edit')

  React.useEffect(() => {
    console.log(" -------- props.match.params.id", params.quickstartsId);
    const quickEdit = allQuickStarts.find((data) => {
      return data.metadata.name === params.quickstartsId;
    });

    if (quickEdit) {
      setQuickStart(quickEdit);
      setQuickYaml(YAML.stringify(quickEdit));
    }
  }, []);

  React.useEffect(() => {
    setPageType(location.pathname === '/quickstarts/add' ? 'Add' : 'Edit')
  }, [location.pathname]);

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
          <Button className="float-right add-new-button" variant="secondary">
            Close
          </Button>
          <Button className="float-right add-new-button" variant="primary">
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

      {quickStart && (
        <QuickStartEdit
          quickStart={quickStart}
          setQuickStart={setQuickStart}
          quickStartId={params.quickstartsId}
          //   allQuickStartStates={allQuickStartStates}
        />
      )}

      {/* <QuickStartsLoader>
        {(quickStarts, loaded) =>
          loaded ? (

          ) : (
            <LoadingBox />
          )
        }
      </QuickStartsLoader> */}
    </>
  );
};