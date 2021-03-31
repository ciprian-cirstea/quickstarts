import React, { useState, useRef } from "react";
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
import MinusCircleIcon from "@patternfly/react-icons/dist/js/icons/minus-circle-icon";
import { QuickStart } from "@quickstarts/utils/quick-start-types";
type PrerequisitesProps = {
  prerequisites?: Array<string>;
  updateValue: Function;
  value: string;
  quickStart: QuickStart;
  submitted: boolean;
};

const PrerequisitesComponent: React.FC<PrerequisitesProps> = ({
  prerequisites,
  updateValue,
  value,
  quickStart,
  submitted,
}) => {
  const [pre, setPre] = useState(prerequisites);
  //   const messagesEndRef = useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [pre]);

  const removePre = (i: number) => {
    const filtered = pre.filter((data, index) => index !== i);
    setPre(filtered);
    updateValue(value, filtered);
  };

  const scrollToBottom = () => {
    // console.log("messagesEndRef", messagesEndRef);
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generatePrerequisite = () => {
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
        // isRequired
        fieldId="simple-form-name-01"
      >
        {pre?.map((p, index) => {
          return (
            <Grid key={`pre-${index}`} className="prereq">
              {/* <GridItem className="pf-u-font-size-sm" span={10}>
                Prerequisite {index + 1}
              </GridItem> */}

              {/* <GridItem className="remove-link" span={2} rowSpan={2}>
                <Button
                  onClick={() => removePre(index)}
                  variant="link"
                  icon={<MinusCircleIcon />}
                >
                  Remove
                </Button>
              </GridItem> */}

              <GridItem span={12}>
                <FormGroup
                  label={
                    <Split>
                      <SplitItem></SplitItem>
                      <SplitItem isFilled></SplitItem>
                      <SplitItem>
                        <Button
                          onClick={() => removePre(index)}
                          variant="link"
                          icon={<MinusCircleIcon />}
                        >
                          Remove
                        </Button>
                      </SplitItem>
                    </Split>
                  }
                  isRequired
                  fieldId="simple-form-name-01"
                >
                  <TextInput
                    isRequired
                    //   validated={pre[index] ? "default" : "error"}
                    validated={
                      pre[index] === "" && submitted ? "error" : "default"
                    }
                    type="text"
                    id={`prerequisite-${index}`}
                    name={`prerequisite-${index}`}
                    aria-describedby={`prerequisite-${index}-helper`}
                    value={pre.length ? pre[index] : null}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormGroup>
              </GridItem>
            </Grid>
          );
        })}
      </FormGroup>
      <Button
        // ref={messagesEndRef}
        //TODO FIX THIS
        // ref={(el) => {
        //   console.log("elllllll", el);
        //   messagesEndRef.current = el;
        // }}
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
