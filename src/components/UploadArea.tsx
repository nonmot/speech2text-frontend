import React from "react";
import { FileUploader } from 'react-drag-drop-files';

type Props = {
  files: File[] | null;
  setFiles: Function;
}

const UploadArea: React.FC<Props> = (props) => {
  const  { files, setFiles } = props;

  const fileTypes = ["WAV"];

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
    <div className="py-5">
      <label
        className="block mb-2 text-md font-medium text-gray-900"
      >音声アップロード<span className="text-red-700"> *</span></label>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="min-h-40"
      />
    </div>
  );
}

export default UploadArea;

