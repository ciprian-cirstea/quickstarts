import React from "react";
import { Tabs, Tab, TabTitleText } from "@patternfly/react-core";
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
import "./QuickStartEdit.scss";

type QuickStartEditProps = {
  quickStartId: string;
  quickStarts: QuickStart[];
};

const QuickStartEdit: React.FC<QuickStartEditProps> = ({
  quickStartId,
  quickStarts,
}) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [quickStart, setQuickStart] = React.useState(undefined);
  const [quickYaml, setQuickYaml] = React.useState(undefined);

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

  const handleQuickStartChange = (value: string) => {
    setQuickStart(YAML2JSON.parse(value));
    setQuickYaml(value);
  };

  return (
    <div className="tabs-container">
      <Tabs activeKey={tabIndex} onSelect={handleTabClick} isBox={false}>
        <Tab eventKey={0} title={<TabTitleText>Edit</TabTitleText>}>
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

            <ActionGroup>
              <Button variant="primary">Submit</Button>
              <Button variant="link">Cancel</Button>
            </ActionGroup>
          </Form>
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Preview</TabTitleText>}>
          {quickStart !== undefined ? (
            <div>
              <QuickStartTile
                quickStart={quickStart}
                isActive={false}
                //   status={getQuickStartStatus(allQuickStartStates, quickStartId)}
                onClick={() => {}}
              />
            </div>
          ) : null}
        </Tab>
      </Tabs>
    </div>
  );
};

export default QuickStartEdit;
