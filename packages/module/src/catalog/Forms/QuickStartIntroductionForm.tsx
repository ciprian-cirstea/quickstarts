import React, { useState } from "react";
// import {
//   TextInput,
//   Split,
//   SplitItem,
//   Grid,
//   GridItem,
// } from "@patternfly/react-core";
// import { Form, FormGroup, TextArea, Button } from "@patternfly/react-core";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

import "./QuickStartIntroductionForm.scss";
import FormInput from "./FormInput";
// import PrerequisitesComponent from "./PrerequisitesComponent";

type ContributionDetailsFormProps = {
  quickstart?: QuickStart;
  updateQuickStart: Function;
  submitted: boolean;
  errors: object;
};

const QuickStartIntroductionForm: React.FC<ContributionDetailsFormProps> = ({
  quickstart,
  updateQuickStart,
  submitted,
  errors,
}) => {
  const [quickStartFormData, setQuickStartFormData] = useState<QuickStart>(
    null
  );

  React.useEffect(() => {
    if (quickstart?.hasOwnProperty("spec")) {
      setQuickStartFormData(quickstart);
    }
  }, []);

  const quickUpdate = (value, e) => {
    const newQuick = { ...quickstart };
    if (!newQuick.spec[value]) {
      newQuick.spec[value] = "";
    }
    newQuick.spec[value] = e;
    updateQuickStart(newQuick);
  };

  return (
    <React.Fragment>
      {quickStartFormData ? (
        <FormInput
          key="intro"
          initialValue={quickStartFormData.spec["introduction"]}
          label="Introduction"
          id="introduction"
          value="introduction"
          textarea={true}
          type="text"
          updateValue={quickUpdate}
          errors={errors}
          submitted={submitted}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartIntroductionForm;
