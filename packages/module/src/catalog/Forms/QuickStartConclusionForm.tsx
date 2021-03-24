import React, { useState } from "react";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
import FormInput from "./FormInput";

import "./QuickStartIntroductionForm.scss";

type ConclusionFormProps = {
  quickstart?: QuickStart;
  updateQuickStart: Function;
  submitted: boolean;
  errors: object;
};

const QuickStartConclusionForm: React.FC<ConclusionFormProps> = ({
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
          key="conclusion"
          initialValue={quickStartFormData.spec["conclusion"]}
          label="Conclusion"
          id="conclusion"
          value="conclusion"
          textarea={false}
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

export default QuickStartConclusionForm;
