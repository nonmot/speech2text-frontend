import { useState } from 'react';
import UploadArea from '../components/UploadArea';
import ModelList from '../components/ModelList';
import { recognize } from '../api/api';
import type { Model, KeywordHit } from '../types/types';
import DisplayTranscript from '../components/DisplayTranscript';
import KeywordSearch from '../features/KeywordSearch/KeywordSearch';
import Loading from '../components/Loading';

const Home = () => {
  const [transcript, setTranscrip] = useState<string | null>('');
  const [files, setFiles] = useState<File[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [model, setModel] = useState<Model | null>(null);
  const [kwHits, setKwHits] = useState<KeywordHit[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = async (file: File) => {
    setIsLoading(true);
    setTranscrip('');
    setKwHits(null);
    try {
      const data = await recognize(file, model!);
      setTranscrip(data.transcript);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error: ${error}`);
      setTranscrip('Sorry, something went wrong.');
      setIsLoading(false);
    }
  };

  const onClickDeleteFile = (index: number) => {
    if (!files) return;
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="mt-10">
      <div className="flex bg-white p-7 rounded-lg">
        <div className="flex-1">
          <div>
            <h2 className="text-2xl">音声アップロード</h2>
            <ModelList model={model} setModel={setModel} />
          </div>
          <div className="">
            <UploadArea files={files} setFiles={setFiles} />
          </div>
          <div className="flex-1">
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
                          onClick={() => handleClick(file)}
                          disabled={!model || isLoading}
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
          </div>
        </div>
      </div>
      <div className="my-10 flex bg-white rounded-lg p-7 min-h-40">
        <div className="grid grid-cols-2 space-x-4 w-full">
          <div className="grid-span-1">
            <h2 className="text-2xl">文字起こし結果</h2>
            {isLoading ? (
              <div className="flex justify-center p-5">
                <Loading size={40} />
              </div>
            ) : (
              <DisplayTranscript
                transcript={transcript}
                keywordHits={kwHits}
                activeId={activeId}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-7 rounded-lg">
        <KeywordSearch
          transcript={transcript}
          keywordHits={kwHits}
          setKeywordsHits={setKwHits}
          setActiveId={setActiveId}
        />
      </div>
    </div>
  );
};

export default Home;
