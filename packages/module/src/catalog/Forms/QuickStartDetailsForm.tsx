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
import FormInput from "./FormInput";
import PrerequisitesComponent from "./PrerequisitesComponent";
import { Checkbox } from "@patternfly/react-core/dist/js/components";

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

  const checkboxWithDescription = () => (
    <Checkbox
      id="check-8"
      label="CheckBox with description"
      aria-label="Checkbox with description example"
      description="Description"
    />
  );

  return (
    <React.Fragment>
      {quickStartFormData ? (
        <Form onSubmit={handleSubmit}>
          <FormInput
            key="title"
            initialValue={quickStartFormData.spec["displayName"]}
            label="Quick Start Title"
            id="display-name"
            value="displayName"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />

          <FormInput
            key="icon"
            initialValue={quickStartFormData.spec["icon"]}
            label="Quick Start Icon"
            id="icon"
            value="icon"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />

          {checkboxWithDescription}
          <Split hasGutter>
            <SplitItem>
              <FormInput
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
              <FormInput
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

          <FormInput
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
