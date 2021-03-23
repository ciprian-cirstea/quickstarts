import React, { useState } from "react";
import {
  TextInput,
  Split,
  SplitItem,
  Grid,
  GridItem,
} from "@patternfly/react-core";
import { Form, FormGroup, TextArea, Button } from "@patternfly/react-core";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

import "./QuickStartDetailsForm.scss";
import ContributionInput from "./ContributionInput";
import PrerequisitesComponent from "./PrerequisitesComponent";

type ContributionDetailsFormProps = {
  quickstart: QuickStart;
  updateQuickStart: Function;
};

const QuickStartDetailsForm: React.FC<ContributionDetailsFormProps> = ({
  quickstart,
  updateQuickStart,
}) => {
  const [quickStartFormData, setQuickStartFormData] = useState<QuickStart>(
    null
  );

  React.useEffect(() => {
    if (quickstart.hasOwnProperty("spec")) {
      setQuickStartFormData(quickstart);
    }
  }, []);

  const handleSubmit = () => {
    console.log("submit");
  };

  const quickUpdate = (value, e) => {
    const newQuick = { ...quickstart };
    newQuick.spec[value] = e;
    updateQuickStart(newQuick);
  };

  return (
    <React.Fragment>
      {quickStartFormData ? (
        <Form onSubmit={handleSubmit}>
          <ContributionInput
            key="icon"
            initialValue={quickStartFormData.spec["icon"]}
            label="Quick Start Icon"
            id="icon"
            value="icon"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
          <ContributionInput
            key="title"
            initialValue={quickStartFormData.spec["displayName"]}
            label="Quick Start Title"
            id="display-name"
            value="displayName"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />

          <Split hasGutter>
            <SplitItem>
              <ContributionInput
                key="version"
                initialValue={quickStartFormData.spec["version"]}
                label="Version"
                id="version"
                value="version"
                textarea={false}
                type="number"
                updateValue={quickUpdate}
              />
            </SplitItem>

            <SplitItem>
              <ContributionInput
                key="duration"
                initialValue={quickStartFormData.spec["durationMinutes"]}
                label="Duration"
                id="duration"
                value="durationMinutes"
                textarea={false}
                type="number"
                updateValue={quickUpdate}
              />
            </SplitItem>
          </Split>

          <ContributionInput
            key="description"
            initialValue={quickStartFormData.spec["description"]}
            label="Description"
            id="description"
            value="description"
            textarea={true}
            type="text"
            updateValue={quickUpdate}
          />

          <PrerequisitesComponent
            prerequisites={quickstart.spec.prerequisites}
            updateValue={quickUpdate}
            value="prerequisites"
          />
        </Form>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartDetailsForm;
