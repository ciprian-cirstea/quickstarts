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

import "./QuickStartTileForm.scss";
import ContributionInput from "./ContributionInput";
import PrerequisitesComponent from "./PrerequisitesComponent";

type ContributionDetailsFormProps = {
  quickstart: QuickStart;
  updateQuickStart: Function;
};

const QuickStartTourForm: React.FC<ContributionDetailsFormProps> = ({
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
            key="intro"
            initialValue={quickStartFormData.spec["introduction"]}
            label="Introduction"
            id="introduction"
            value="introduction"
            textarea={true}
            type="text"
            updateValue={quickUpdate}
          />
          <ContributionInput
            key="conclusion"
            initialValue={quickStartFormData.spec["conclusion"]}
            label="Conclusion"
            id="conclusion"
            value="conclusion"
            textarea={false}
            type="text"
            updateValue={quickUpdate}
          />
        </Form>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default QuickStartTourForm;
