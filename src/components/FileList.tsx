import { Model } from '../types/types';

type Props = {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  handleClickRecognize: Function;
  model: Model | null;
  disabled: boolean;
};

const FileList: React.FC<Props> = (props) => {
  const { files, setFiles, handleClickRecognize, disabled } = props;

  const onClickDeleteFile = (index: number) => {
    if (!files) return;
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <>
      <ul className="py-1">
        {files ? (
          files.map((file, index) => (
            <li key={index} className="border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-900 truncate max-w-xs">
                  {file['name']}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => handleClickRecognize(file)}
                    disabled={disabled}
                  >
                    認識
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 p-1 rounded"
                    onClick={() => onClickDeleteFile(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No file is uploaded.</p>
        )}
      </ul>
    </>
  );
};

export default FileList;
