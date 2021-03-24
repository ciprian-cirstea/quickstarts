import React, { useState } from "react";
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
};

  const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
    initialValue,
    label,
    id,
    value,
    updateValue,
  }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleAddImage = () => {
        let newInput = inputValue + `
        ![IMAGE_ALT_TEXT_HERE](IMAGE_URL_HERE)`

        setInputValue(newInput)
        updateValue(value, newInput);
    };

    const handleAddVideo = () => {
        let newInput = inputValue + `
        <video controls>
            <source src="VIDEO_URL_HERE" type="video/mp4">
            Your browser does not support HTML video.
        </video>`
        
        setInputValue(newInput)
        updateValue(value, newInput);
    }

    const handleAddYoutubeVideo = () => {
        let newInput = inputValue +`
        <iframe
            width="560"
            height="315"
            src="YOUTUBE_VIDEO_URL_HERE"
            title="YouTube video player"
            frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen>
        </iframe>`

        setInputValue(newInput)
        updateValue(value, newInput);
    }

    const handleUpdateValue = (key, val) => {
        console.log(" --- handleUpdateValue", key, val);
        updateValue(key, val)
        setInputValue(val)
    }

    return <React.Fragment>
        <FormInput
            key={`description`}
            initialValue={inputValue}
            label={label}
            id={id}
            value={value}
            textarea
            type="text"
            updateValue={handleUpdateValue}
        />
        <Split hasGutter>
            <SplitItem>
                <Button variant="link" icon={<PlusCircleIcon />} onClick={handleAddImage}>
                    Add image
                </Button>
            </SplitItem>
            <SplitItem>
                <Button variant="link" icon={<PlusCircleIcon />} onClick={handleAddVideo}>
                    Add video
                </Button>
            </SplitItem>
            <SplitItem>
                <Button variant="link" icon={<PlusCircleIcon />} onClick={handleAddYoutubeVideo}>
                    Add YouTube video
                </Button>
            </SplitItem>
        </Split>
    </React.Fragment>
};

export default DescriptionComponent;
