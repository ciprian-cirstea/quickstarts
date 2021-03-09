import React, { useState } from "react";
import { TextInput, FormGroup } from "@patternfly/react-core";
import { QuickStart } from "@quickstarts/utils/quick-start-types";

type ContributionTitleProps = {
  quickstart: QuickStart;
};

const ContributionTitle: React.FC<ContributionTitleProps> = ({
  quickstart,
}) => {
  const [displayName, setDisplayName] = useState(quickstart.spec.displayName);

  const handleChange = (e) => {
    setDisplayName(e);
  };

  return (
    <FormGroup label="Contribution Title" isRequired fieldId="display-name">
      <TextInput
        isRequired
        type="text"
        id="display-name"
        name="display-name"
        value={displayName}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

export default ContributionTitle;
