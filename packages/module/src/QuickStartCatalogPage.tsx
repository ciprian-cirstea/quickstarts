import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "@console/internal/components/utils";
import { Text, Button } from "@patternfly/react-core";
import QuickStartCatalog from "./catalog/QuickStartCatalog";
import QuickStartsLoader from "./loader/QuickStartsLoader";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";

type QuickStartCatalogPageProps = {
  showFilter?: boolean;
};

export const QuickStartCatalogPage: React.FC<QuickStartCatalogPageProps> = ({
  showFilter,
}) => {
  const { t } = useTranslation();
  const { global } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );

  const onAddLinkClick = global?.onAddLinkClick;

  return (
    <>
      <div className="ocs-page-layout__header">
        <Text component="h1" className="ocs-page-layout__title">
          {t("quickstart~Quick Starts")}
          {onAddLinkClick && (
            <Button
              onClick={onAddLinkClick}
              variant="secondary"
              className="add-new-button"
            >
              Add New
            </Button>
          )}
        </Text>
        {/* <div className="ocs-page-layout__hint">
          {t(
            'quickstart~Learn how to create, import, and run applications on OpenShift with step-by-step instructions and tasks.',
          )}
        </div> */}
      </div>
      <QuickStartsLoader>
        {(quickStarts, loaded) =>
          loaded ? (
            <Router>
              <QuickStartCatalog
                quickStarts={quickStarts}
                showFilter={showFilter}
              />
            </Router>
          ) : (
            <LoadingBox />
          )
        }
      </QuickStartsLoader>
    </>
  );
};
