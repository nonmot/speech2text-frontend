import { useState } from 'react';
import UploadArea from '../components/UploadArea';
import ModelList from '../components/ModelList';
import { keywordSearch, recognize } from '../api/api';
import type { Model, KeywordHit } from '../types/types';
import DisplayTranscript from '../components/DisplayTranscript';
import KeywordSearch from '../features/KeywordSearch/KeywordSearch';
import Loading from '../components/Loading';
import FileList from '../components/FileList';

const Home: React.FC = () => {
  const [transcript, setTranscrip] = useState<string | null>('');
  const [files, setFiles] = useState<File[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [model, setModel] = useState<Model | null>(null);
  const [kwHits, setKwHits] = useState<KeywordHit[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleClick = async (file: File) => {
    setIsLoading(true);
    setTranscrip('');
    setKwHits(null);
    try {
      const data = await recognize(file, model!);
      setTranscrip(data.transcript);
      if (data.transcript) {
        const highlights = await keywordSearch(data.transcript, keywords);
        setKwHits(highlights.highlights);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      setTranscrip('Sorry, something went wrong.');
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-10">
      <div className="flex bg-white p-7 rounded-lg">
        <div className="w-full">
          <div className="w-full">
            <h2 className="text-2xl">音声アップロード</h2>
            <ModelList model={model} setModel={setModel} />
          </div>
          <div className="">
            <UploadArea files={files} setFiles={setFiles} />
          </div>
          <div className="flex-1">
            <FileList
              files={files}
              setFiles={setFiles}
              handleClickRecognize={handleClick}
              model={model}
              disabled={!model || isLoading}
            />
          </div>
        </div>
      </div>
      <div className="my-10 bg-white rounded-lg p-7 min-h-40 grid grid-cols-3 divide-x w-full">
        <div className="col-span-2 px-5">
          <h2 className="text-2xl">文字起こし結果</h2>
          {isLoading ? (
            <div className="flex justify-center h-full items-center p-5">
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
        <div className="col-span-1 px-5">
          <div className="">
            <KeywordSearch
              keywords={keywords}
              setKeywords={setKeywords}
              transcript={transcript}
              keywordHits={kwHits}
              setKeywordsHits={setKwHits}
              setActiveId={setActiveId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
