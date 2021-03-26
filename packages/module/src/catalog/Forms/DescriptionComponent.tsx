import React, { useState, useRef } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import FormInput from "./FormInput";
import { Button } from "@patternfly/react-core";
import PlusCircleIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";

type DescriptionComponentProps = {
  initialValue?: any;
  label: string;
  id: string;
  value: string;
  textarea: boolean;
  type: "number" | "text";
  updateValue?: Function;
  errors: object;
  submitted: boolean;
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  initialValue,
  label,
  id,
  value,
  updateValue,
  errors,
  submitted,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleAddImage = () => {
    let newInput = inputValue.substr(0, myRef.current.selectionStart) + `
![IMAGE_ALT_TEXT_HERE](IMAGE_URL_HERE)` + inputValue.substr(myRef.current.selectionEnd) 

    setInputValue(newInput);
    updateValue(value, newInput);
  };

  const handleAddVideo = () => {
    let newInput = inputValue.substr(0, myRef.current.selectionStart) + `
<video controls>
    <source src="VIDEO_URL_HERE" type="video/mp4">
    Your browser does not support HTML video.
</video>` + inputValue.substr(myRef.current.selectionEnd) 


    setInputValue(newInput);
    updateValue(value, newInput);
  };

  const handleAddYoutubeVideo = () => {
    let newInput = inputValue.substr(0, myRef.current.selectionStart) + `
<iframe
    width="560"
    height="315"
    src="YOUTUBE_VIDEO_URL_HERE"
    title="YouTube video player"
    frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
    allowfullscreen>
</iframe>` + inputValue.substr(myRef.current.selectionEnd) 

    setInputValue(newInput);
    updateValue(value, newInput);
  };

  const handleUpdateValue = (key, val) => {
    updateValue(key, val);
    setInputValue(val);
  };

  const myRef = useRef(null);

  React.useEffect(() => {
    myRef.current.selectionStart = initialValue.length
  }, [ myRef.current ])

  return (
    <React.Fragment>
      <FormInput
        key={`description`}
        initialValue={inputValue}
        label={label}
        id={id}
        value={value}
        textarea
        type="text"
        updateValue={handleUpdateValue}
        errors={errors}
        submitted={submitted}
        rows={15}
        inputRef={myRef}
      />
      <Split hasGutter>
        <SplitItem>
          <Button
            variant="link"
            icon={<PlusCircleIcon />}
            onClick={handleAddImage}
          >
            Add image
          </Button>
        </SplitItem>
        <SplitItem>
          <Button
            variant="link"
            icon={<PlusCircleIcon />}
            onClick={handleAddVideo}
          >
            Add video
          </Button>
        </SplitItem>
        <SplitItem>
          <Button
            variant="link"
            icon={<PlusCircleIcon />}
            onClick={handleAddYoutubeVideo}
          >
            Add YouTube video
          </Button>
        </SplitItem>
      </Split>
    </React.Fragment>
  );
};

export default DescriptionComponent;
