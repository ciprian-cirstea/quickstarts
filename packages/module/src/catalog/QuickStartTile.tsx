import * as React from "react";
import { useEffect } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { CatalogTile } from "@patternfly/react-catalog-view-extension";
import { RocketIcon, EditAltIcon } from "@patternfly/react-icons";
import { Button, Tooltip } from '@patternfly/react-core';
import { FallbackImg } from "@console/shared";
import { QuickStartStatus, QuickStart } from "../utils/quick-start-types";
import QuickStartTileHeader from "./QuickStartTileHeader";
import QuickStartTileDescription from "./QuickStartTileDescription";
import QuickStartTileFooter from "./QuickStartTileFooter";
import { QuickStartContext, QuickStartContextValues } from '../utils/quick-start-context';

import "./QuickStartTile.scss";

type QuickStartTileProps = {
  quickStart: QuickStart;
  status?: QuickStartStatus;
  isActive: boolean;
  onClick: () => void;
};

const QuickStartTile: React.FC<QuickStartTileProps> = ({
  quickStart,
  status,
  isActive,
  onClick,
}) => {
  const {
    metadata: { name: id },
    spec: {
      icon,
      tasks,
      displayName,
      description,
      durationMinutes,
      prerequisites,
    },
  } = quickStart;

  const {
    global
  } = React.useContext<QuickStartContextValues>(QuickStartContext);

  const onEditLinkClick = global?.onEditLinkClick;
  const path = window.location.pathname

  const yamls = [
    'add-healthchecks',
    'install-app-and-associate-pipeline',
    'sample-application',
    'serverless-application'
  ] // TODO monkey hardcoding yaml only 


  useEffect(() => {
    console.log(" -------- quickStart", quickStart)
  }, [])

  const edit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(" --- edit --- ")
      onEditLinkClick(id)
    },
    [id],
  );

  const quickStartIcon = (
    <React.Fragment>
      <FallbackImg
        className="co-catalog-item-icon__img--large"
        src={icon}
        fallback={<RocketIcon />}
      />
     {
        yamls.includes(id) ?
          onEditLinkClick &&
          path === '/quickstarts' && (
            <Tooltip content='Edit'>
              <Button
                onClick={edit}
                variant="tertiary"
                icon={<EditAltIcon />}/>
            </Tooltip>
          ) : null
      }
    </React.Fragment>
  );

  return (
    <CatalogTile
      icon={quickStartIcon}
      className="co-quick-start-tile"
      featured={isActive}
      title={
        <QuickStartTileHeader
          name={displayName}
          status={status}
          duration={durationMinutes} />
      }
      onClick={onClick}
      description={
        <QuickStartTileDescription
          description={description}
          prerequisites={prerequisites}
        />
      }
      footer={
        <Router>
          <QuickStartTileFooter
            quickStartId={id}
            status={status}
            totalTasks={tasks?.length}
          />
        </Router>
      }
    />
  );
};

export default QuickStartTile;
