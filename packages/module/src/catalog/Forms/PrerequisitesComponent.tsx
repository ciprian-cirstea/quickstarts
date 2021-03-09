import React, { useState } from "react";
import {
  TextInput,
  FormGroup,
  Split,
  SplitItem,
  Grid,
  GridItem,
  Button,
} from "@patternfly/react-core";
import PlusCircleIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";

type PrerequisitesProps = {
  prerequisites: Array<string>;
  updateValue: Function;
  value: string;
};

const PrerequisitesComponent: React.FC<PrerequisitesProps> = ({
  prerequisites,
  updateValue,
  value,
}) => {
  const [pre, setPre] = useState(prerequisites);

  const removePre = (i: number) => {
    if (i === 0) return;
    const filtered = pre.filter((data, index) => index !== i);
    setPre(filtered);
    updateValue(value, filtered);
  };

  const generatePrerequisite = () => {
    console.log("generate prerequisite");
    let newPre = [...pre, ""];
    setPre(newPre);
    updateValue(value, newPre);
  };

  const handleChange = (e: string, index: number) => {
    let newArr = [...pre];
    newArr[index] = e;
    setPre(newArr);
    updateValue(value, newArr);
  };

  return (
    <React.Fragment>
      <FormGroup
        label={"Prerequisites"}
        isRequired
        fieldId="simple-form-name-01"
      >
        {pre.map((p, index) => {
          return (
            <Grid key={`pre-${index}`} className="prereq">
              <GridItem className="pf-u-font-size-sm" span={10}>
                Prerequisite {index + 1}
              </GridItem>
              {index > 0 ? (
                <GridItem className="remove-link" span={2} rowSpan={2}>
                  <Button
                    onClick={() => removePre(index)}
                    variant="link"
                    // icon={<PlusCircleIcon />}
                  >
                    Remove
                  </Button>
                </GridItem>
              ) : (
                ""
              )}
              <GridItem span={12}>
                <TextInput
                  isRequired
                  validated={pre[index] ? "default" : "error"}
                  type="text"
                  id={`prerequisite-${index}`}
                  name={`prerequisite-${index}`}
                  aria-describedby={`prerequisite-${index}-helper`}
                  value={pre.length ? pre[index] : null}
                  onChange={(e) => handleChange(e, index)}
                />
              </GridItem>
            </Grid>
          );
        })}
      </FormGroup>
      <Button
        onClick={() => generatePrerequisite()}
        variant="link"
        icon={<PlusCircleIcon />}
      >
        Add more prerequisites
      </Button>
    </React.Fragment>
  );
};

export default PrerequisitesComponent;
