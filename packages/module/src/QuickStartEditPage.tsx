import * as React from "react";
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { LoadingBox } from "@console/internal/components/utils";
import { Text } from "@patternfly/react-core";
import QuickStartCatalog from "./catalog/QuickStartCatalog";
import QuickStartsLoader from "./loader/QuickStartsLoader";
import QuickStartEdit from "./catalog/QuickStartEdit";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";

type QuickStartEditPageProps = {
  match?: any;
};

export const QuickStartEditPage: React.FC<QuickStartEditPageProps> = (props) => {
  const { t } = useTranslation();
  const { match: { params } } = props;
  const { allQuickStartStates } = React.useContext<QuickStartContextValues>(QuickStartContext);

  React.useEffect(() => {
    console.log(" -------- props.match.params.id", params.quickstartsId)
  }, [])

  
  return (
    <>
      <div className="ocs-page-layout__header">
        <Text component="h1" className="ocs-page-layout__title">
          Edit quickstart
        </Text>
      </div>
      <QuickStartsLoader>
        {(quickStarts, loaded) =>
          loaded ? (
              <QuickStartEdit
                quickStarts={quickStarts}
                quickStartId={params.quickstartsId}
                allQuickStartStates={allQuickStartStates}
              />
          ) : (
            <LoadingBox />
          )
        }
      </QuickStartsLoader>
    </>
  );
};
