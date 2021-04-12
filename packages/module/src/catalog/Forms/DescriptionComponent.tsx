import React, { useState, useRef } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import FormInput from "./FormInput";
import { Button } from "@patternfly/react-core";
import PlusCircleIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import videoPlugin from '@leeonfield/editor-plugin-video';

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

  const handleUpdateValue = (key, val) => {
    updateValue(key, val);
    setInputValue(val);
  };

  const handleAddVideo = () => {
    let newInput =
      editorRef.current.getInstance().getMarkdown() +
      `
\`\`\` source-mp4
VIDEO_URL_HERE
\`\`\``

      handleUpdateValue(value, newInput);
  };

  const handleAddYoutubeVideo = () => {
    let newInput =
      editorRef.current.getInstance().getMarkdown() +
      `
\`\`\` youtube
VIDEO_ID_HERE
\`\`\``

    handleUpdateValue(value, newInput);
  };

  ///////////////// toast ui editor
  const editorRef = useRef(null);
  let editorInstance;

  React.useEffect(() => {
    editorInstance = editorRef.current.getInstance()

    editorInstance.eventManager.listen('change', (e) => {
      // handleUpdateValue(value, editorRef.current.getInstance().getMarkdown());
      updateValue(value, editorRef.current.getInstance().getMarkdown());
    });
  }, [])

  React.useEffect(() => {
    editorRef.current.getInstance().setMarkdown(inputValue);
  }, [inputValue])

  return (
    <React.Fragment>
      <Editor
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        initialValue={inputValue}
        ref={editorRef}
        plugins={[videoPlugin]}
      />

      <Split hasGutter>
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
