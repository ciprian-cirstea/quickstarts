import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TabTitleText,
  Grid,
  GridItem,
  Menu,
  MenuList,
  MenuItem,
  Checkbox,
  TextInput,
  Popover,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import {
  Form,
  FormGroup,
  TextArea,
  ActionGroup,
  Button,
} from "@patternfly/react-core";
import "./QuickStartTile.scss";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import QuickStartTile from "./QuickStartTile";
import YAML from "json-to-pretty-yaml";
import * as YAML2JSON from "yamljs";
import DownloadIcon from "@patternfly/react-icons/dist/js/icons/download-icon";

import {
  getQuickStartStatus,
  getQuickStartStatusCount,
  filterQuickStarts,
} from "../utils/quick-start-utils";

import "./QuickStartEdit.scss";
import ContributionDetailsForm from "./Forms/ContributionDetailsForm";
import TaskDetailsForm from "./Forms/TaskDetailsForm";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "@quickstarts/utils/quick-start-context";

type QuickStartEditProps = {
  quickStartId?: string;
  quickStarts: QuickStart[];
  allQuickStartStates;
};

const QuickStartEdit: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStarts,
  //   allQuickStartStates,
}) => {
  const {
    activeQuickStartID,
    allQuickStartStates,
    setActiveQuickStart,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [quickStart, setQuickStart] = useState(undefined);
  const [quickYaml, setQuickYaml] = useState(undefined);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  React.useEffect(() => {
    const quickEdit = quickStarts.find((data) => {
      return data.metadata.name === quickStartId;
    });

    if (quickEdit) {
      setQuickStart(quickEdit);
      setQuickYaml(YAML.stringify(quickEdit));
    }
  }, []);

  const handleTabClick = (event, tabIndex: number) => setTabIndex(tabIndex);

  const handleMenuClick = (event, itemId: number) => {
    setActiveMenuItem(itemId);
  };

  const updateQuickStart = (newQuickStart: QuickStart) => {
    setQuickStart(newQuickStart);
  };

  const handleQuickStartChange = (value: string) => {
    setQuickStart(YAML2JSON.parse(value));
    setQuickYaml(value);
  };

  const formGenerator = () => {
    console.log("activeMenuItem---------------------", activeMenuItem);
    switch (activeMenuItem) {
      case 11:
        return <div className="pf-u-font-size-2xl">IBM Quick Starts Help</div>;
      case 22:
        return (
          <ContributionDetailsForm
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );
      case 33:
        return (
          <Form>
            <FormGroup fieldId="horizontal-form-exp">
              <TextArea
                rows={40}
                value={quickYaml}
                onChange={handleQuickStartChange}
                name="horizontal-form-exp"
                id="horizontal-form-exp"
              />
            </FormGroup>
          </Form>
        );

      case 44:
        return (
          <TaskDetailsForm
            key="new"
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
          />
        );

      default:
        return (
          <TaskDetailsForm
            key="edit"
            quickstart={quickStart}
            updateQuickStart={updateQuickStart}
            task={quickStart.spec.tasks[activeMenuItem]}
          />
        );
    }
  };

  return (
    <div className="tabs-container">
      {quickStart ? (
        <React.Fragment>
          <Button className="float-right" variant="primary">
            Save
          </Button>
          <Button
            className="float-right"
            variant="link"
            icon={<DownloadIcon />}
          >
            Download YAML
          </Button>
          <Tabs activeKey={tabIndex} onSelect={handleTabClick} isBox={true}>
            <Tab
              eventKey={0}
              title={<TabTitleText>Quick Start Editor</TabTitleText>}
            >
              <Grid hasGutter>
                <GridItem span={2}>
                  <Menu
                    activeItemId={activeMenuItem}
                    onSelect={handleMenuClick}
                  >
                    <MenuList>
                      <MenuItem itemId={11}>Read Me First</MenuItem>
                      <MenuItem itemId={22}>Quick Start Editor</MenuItem>
                      <MenuItem itemId={33}>YAML</MenuItem>

                      {quickStart
                        ? quickStart.spec.tasks.map((task, index) => {
                            return (
                              <MenuItem key={index} itemId={`${index}`}>
                                {task.title}
                              </MenuItem>
                            );
                          })
                        : null}

                      <MenuItem itemId={44}>Add Task+</MenuItem>
                    </MenuList>
                  </Menu>
                </GridItem>
                <GridItem span={6}>{formGenerator()}</GridItem>
                <GridItem span={2}>
                  {quickStart !== undefined ? (
                    <QuickStartTile
                      quickStart={quickStart}
                      isActive={quickStartId === activeQuickStartID}
                      status={getQuickStartStatus(
                        allQuickStartStates,
                        quickStartId
                      )}
                      onClick={() => {}}
                    />
                  ) : null}
                </GridItem>

                {/* Quick start content */}
                <GridItem span={2}>4</GridItem>
              </Grid>
            </Tab>
            <Tab
              eventKey={1}
              title={<TabTitleText>Preview Demo </TabTitleText>}
            >
              {quickStart !== undefined ? (
                <div>
                  <QuickStartTile
                    quickStart={quickStart}
                    isActive={false}
                    status={getQuickStartStatus(
                      allQuickStartStates,
                      quickStartId
                    )}
                    onClick={() => {}}
                  />
                </div>
              ) : null}
            </Tab>
          </Tabs>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default QuickStartEdit;
