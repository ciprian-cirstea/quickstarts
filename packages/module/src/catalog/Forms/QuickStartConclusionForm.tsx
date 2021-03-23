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

type ConclusionFormProps = {
  quickstart?: QuickStart;
  updateQuickStart: Function;
};

const QuickStartConclusionForm: React.FC<ConclusionFormProps> = ({
  quickstart,
  updateQuickStart,
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
          key="conclusion"
          initialValue={quickStartFormData.spec["conclusion"]}
          label="Conclusion"
          id="conclusion"
          value="conclusion"
          textarea={false}
          type="text"
          updateValue={quickUpdate}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartConclusionForm;
