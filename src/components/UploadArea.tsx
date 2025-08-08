import React from "react";
import { FileUploader } from 'react-drag-drop-files';

type Props = {
  files: File[] | null;
  setFiles: Function;
}

const UploadArea: React.FC<Props> = (props) => {
  const  { files, setFiles } = props;

  const fileTypes = ["JPG", "PNG", "WAV"];

  const handleChange = (inputFiles: File | File[]) => {
    if (Array.isArray(inputFiles)) {
      throw new Error("Not supported uploading more than 2 files.")
    } else {
      if (files) {
        setFiles([...files, inputFiles]);
	  } else {
        setFiles([inputFiles]);
      }
    }
  };

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </>
  );
}

export default UploadArea;

