import React, { useState } from "react";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

import "./QuickStartDetailsForm.scss";
import FormInput from "./FormInput";

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
            label="Title"
            id="display-name"
            value="displayName"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
            errors={errors}
            submitted={submitted}
          />

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

          <FormInput
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
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartDetailsForm;
