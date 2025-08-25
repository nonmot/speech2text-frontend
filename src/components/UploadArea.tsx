import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

type Props = {
  files: File[] | null;
  setFiles: Function;
};

const UploadArea: React.FC<Props> = (props) => {
  const { files, setFiles } = props;

  const fileTypes = ['WAV'];

  const handleChange = (inputFiles: File | File[]) => {
    if (Array.isArray(inputFiles)) {
      throw new Error('Not supported uploading more than 2 files.');
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
      <label className="block mb-2 text-md font-medium text-gray-900">
        音声アップロード<span className="text-red-700"> *</span>
      </label>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="min-h-40"
      >
        <div className="w-full border-2 border-dashed rounded p-6">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-earmark-music"
              viewBox="0 0 16 16"
            >
              <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.6 2.6 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377s.974-.134 1.338-.377c.36-.24.662-.628.662-1.123V8.89l2-.5z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
            <span>ここにファイルをドロップ</span>
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

export default UploadArea;
