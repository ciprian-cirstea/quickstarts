import React, { useState } from "react";
import { TextInput, FormGroup, TextArea } from "@patternfly/react-core";
import FormInput from "./FormInput";
import { Button } from "@patternfly/react-core";

type DescriptionComponentProps = {
  initialValue?: any;
  label: string;
  id: string;
  value: string;
  textarea: boolean;
  type: "number" | "text";
  updateValue?: Function;
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  initialValue,
  label,
  id,
  value,
  textarea,
  type,
  updateValue,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [descriptionValue, setDescriptionValue] = useState(value);

  React.useEffect(() => {
    console.log(" ------- descriptionValue", descriptionValue);
  }, []);

  const handleAddImage = () => {
    setDescriptionValue(descriptionValue + " test test");
  };

  return (
    <React.Fragment>
      <FormInput
        key="description"
        initialValue
        label={label}
        id={id}
        value={descriptionValue}
        textarea
        type="text"
        updateValue={updateValue}
      />
      <Button variant="secondary" onClick={handleAddImage}>
        Insert image
      </Button>
    </React.Fragment>
  );
};

export default DescriptionComponent;
