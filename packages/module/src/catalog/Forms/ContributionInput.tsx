import React, { useState } from "react";
import { TextInput, FormGroup, TextArea } from "@patternfly/react-core";

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
  const [inputValue, setInputValue] = useState("");

  React.useEffect(() => {
    setInputValue(initialValue);
  }, []);

  React.useEffect(() => {
    setInputValue(initialValue);
    console.log("input useEffect", inputValue);
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e);
    updateValue(value, e);
  };

  //   console.log("inputValue ::::::", inputValue);
  //   console.log("initialValue ;;;;;;;;", initialValue);
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
