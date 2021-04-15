import React, { useState } from "react";
import { TextInput, FormGroup, TextArea } from "@patternfly/react-core";
import { Checkbox } from "@patternfly/react-core/dist/js/components";

type FormInputProps = {
  initialValue?: any;
  label: string;
  id: string;
  value: string;
  textarea: boolean;
  type: "number" | "text";
  updateValue?: Function;
  required?: boolean;
  submitted?: boolean;
  errors?: object;
  rows?: number;
  inputRef?: React.RefObject<any>;
};

const FormInput: React.FC<FormInputProps> = ({
  initialValue,
  label,
  id,
  value,
  textarea,
  type,
  updateValue,
  submitted,
  errors,
  rows,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  //   console.log("form input errors", errors);

  const handleChange = (e) => {
    // setInputValue(e);
    updateValue(value, e);
  };

  React.useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <FormGroup label={label} isRequired fieldId={id}>
      {textarea ? (
        <TextArea
          ref={inputRef}
          rows={rows || 10}
          value={inputValue}
          name={id}
          id={id}
          onChange={handleChange}
          validated={
            submitted && errors?.hasOwnProperty(value) ? "error" : "default"
          }
        />
      ) : (
        <TextInput
          isRequired
          type={type}
          value={inputValue}
          name={id}
          id={id}
          onChange={handleChange}
          validated={
            submitted && errors?.hasOwnProperty(value) ? "error" : "default"
          }
        />
      )}
    </FormGroup>
  );
};

export default FormInput;
