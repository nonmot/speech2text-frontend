import React, { useState } from "react";

type Props = {
  keywords: string[];
  setKeywords: Function;
  onClickDeleteKeyword: Function;
}

const KeywordSearch: React.FC<Props> = (props) => {
  const { keywords, setKeywords, onClickDeleteKeyword } = props;

  const [input, setInput] = useState<string>("");

  const handleAddKeyword = () => {
    if (input.length === 0) return;
    setKeywords([...keywords, input]);
    setInput("");
  }

  const onClickAddKeyword = () => {
    handleAddKeyword();
  }

  const onKeyDownAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleAddKeyword();
  }

  return (
    <>
    <h2 className="text-2xl bold">ワード検索</h2>
    <input
      className="border"
      type="text"
      value={input}
      onKeyDown={onKeyDownAddKeyword}
      onChange={(e) => setInput(e.target.value)}
    />
    <button
      className="bg-green-100"
      onClick={onClickAddKeyword}
    >追加</button>

    <div className="flex space-x-4 mt-5">
      {keywords.length !== 0 ? keywords.map((keyword, index) => (
          <div className="bg-gray-300 p-1 flex items-center">
            <span>{keyword}</span>
            <button onClick={() => onClickDeleteKeyword(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))
        : (
        <p>検索条件なし</p>
      )}
    </div>
    </>
  );
}

export default KeywordSearch;
