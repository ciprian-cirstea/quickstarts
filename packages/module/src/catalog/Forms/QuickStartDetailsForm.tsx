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
  submitted: boolean;
  errors: object;
};

const QuickStartDetailsForm: React.FC<ContributionDetailsFormProps> = ({
  quickstart,
  updateQuickStart,
  submitted,
  errors,
}) => {
  const [quickStartFormData, setQuickStartFormData] = useState<QuickStart>(
    null
  );

  React.useEffect(() => {
    if (quickstart.hasOwnProperty("spec")) {
      setQuickStartFormData(quickstart);
    }
  }, []);

  const quickUpdate = (value, e) => {
    const newQuick = { ...quickstart };
    newQuick.spec[value] = e;
    updateQuickStart(newQuick);
  };

  return (
    <React.Fragment>
      {quickStartFormData ? (
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
            errors={errors}
            submitted={submitted}
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
            errors={errors}
            submitted={submitted}
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
                errors={errors}
                submitted={submitted}
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
                errors={errors}
                submitted={submitted}
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
            errors={errors}
            submitted={submitted}
          />

          <PrerequisitesComponent
            prerequisites={quickstart.spec.prerequisites}
            updateValue={quickUpdate}
            value="prerequisites"
          />
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartDetailsForm;
