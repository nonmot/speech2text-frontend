import { useState } from "react";
import UploadArea from "../components/UploadArea";
import ModelList from "../components/ModelList";
import { recognize } from "../api/api";
import KeywordSearch from "../components/KeywordSearch";

const Home = () => {
  const [transcript, setTranscrip] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [model, setModel] = useState<string>("");

  const handleClick = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await recognize(file);
      setTranscrip(data.results[0].transcript);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error: ${error}`);
      setTranscrip("Sorry, something went wrong.");
      setIsLoading(false);
    }
  }

  const onClickDeleteFile = (index: number) => {
    if (!files) return;
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }

  const onClickDeleteKeyword = (index: number) => {
    if (!keywords) return;
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  }

  return (
    <div className="mt-10">
      <div className="flex w-full space-x-4">
        <div className="">
          <UploadArea
            files={files}
            setFiles={setFiles}
          />
        </div>

        <div className="w-full">
          <ul className="list-disc px-5">
            {files ? files.map((file, index) => (
              <li key={index}>
                <div className="flex space-x-4 items-center mb-2">
                  <p>{file['name']}</p>
                  <button className="bg-blue-300 px-2 py-1 rounded" onClick={() => handleClick(file)}>認識</button>
                  <button className="bg-red-300 px-2 py-1 rounded" onClick={() => onClickDeleteFile(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </li>
            ))
            : (
              <p>No file is uploaded.</p>
            )}
          </ul>
        </div>
      </div>

      <div>
        <ModelList />
      </div>

      <div className="my-10">
        <KeywordSearch
          keywords={keywords}
          setKeywords={setKeywords}
          onClickDeleteKeyword={onClickDeleteKeyword}
        />
      </div>
      <div className="my-10">
        <h2 className="text-2xl bold">文字起こし結果</h2>
        {isLoading ? (
          <p>loading...</p>
        ) : ( transcript ? (
            <p>{transcript}</p>
          ) : (
            <p>ファイルをアップロードしてください。</p>
          )
        )}
      </div>
    </div>
  )
}

export default Home;
