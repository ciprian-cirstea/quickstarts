import React, { useState } from "react";
import { TextInput, FormGroup, TextArea } from "@patternfly/react-core";
// import { QuickStart } from "@quickstarts/utils/quick-start-types";

type ContributionInputProps = {
  initialValue;
  label: string;
  id: string;
  value: string;
  textarea: boolean;
  type: "number" | "text";
  updateValue?: Function;
};

const ContributionInput: React.FC<ContributionInputProps> = ({
  initialValue,
  label,
  id,
  value,
  textarea,
  type,
  updateValue,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e);
    updateValue(value, e);
  };

  return (
    <FormGroup label={label} isRequired fieldId={id}>
      {textarea ? (
        <TextArea
          rows={10}
          value={inputValue}
          name={id}
          id={id}
          onChange={handleChange}
        />
      ) : (
        <TextInput
          isRequired
          type={type}
          value={inputValue}
          name={id}
          id={id}
          onChange={handleChange}
        />
      )}
    </FormGroup>
  );
};

export default ContributionInput;
