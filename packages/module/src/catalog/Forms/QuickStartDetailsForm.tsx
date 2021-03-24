import React, { useState } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

import "./QuickStartDetailsForm.scss";
import FormInput from "./FormInput";
import DescriptionComponent from "./DescriptionComponent";
import PrerequisitesComponent from "./PrerequisitesComponent";
import { Checkbox } from "@patternfly/react-core/dist/js/components";

type ContributionDetailsFormProps = {
  quickstart: QuickStart;
  updateQuickStart: Function;
  deactivateQuickstart;
};

const QuickStartDetailsForm: React.FC<ContributionDetailsFormProps> = ({
  quickstart,
  updateQuickStart,
  deactivateQuickstart,
}) => {
  const [quickStartFormData, setQuickStartFormData] = useState<QuickStart>(
    null
  );

  React.useEffect(() => {
    if (quickstart.hasOwnProperty("spec")) {
      setQuickStartFormData(quickstart);
    }
  }, []);

  //   const handleSubmit = () => {
  //     console.log("submit");
  //   };

  const quickUpdate = (value, e) => {
    const newQuick = { ...quickstart };
    newQuick.spec[value] = e;
    updateQuickStart(newQuick);
  };

  const checkboxWithDescription = () => (
    <Checkbox
      label="Deactivate Quick Start"
      isChecked={quickstart.hasOwnProperty("inactive")}
      onChange={deactivateQuickstart}
      aria-label="controlled checkbox example"
      id="deactivate-quickstart"
      name="deactivate-quickstart"
    />
  );

  return (
    <React.Fragment>
      {quickStartFormData ? (
        // <Form onSubmit={handleSubmit}>
        <React.Fragment>
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
          <div className="deactivate-checkbox">{checkboxWithDescription()}</div>

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

          <DescriptionComponent
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
        </React.Fragment>
      ) : (
        // </Form>
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartDetailsForm;
