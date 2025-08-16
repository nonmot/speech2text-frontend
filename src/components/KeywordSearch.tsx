import React, { useState } from "react";

type Props = {
  keywords: string[];
  setKeywords: Function;
  onClickDeleteKeyword: Function;
}

const KeywordSearch: React.FC<Props> = (props) => {
  const { keywords, setKeywords, onClickDeleteKeyword } = props;

  const [input, setInput] = useState<string>("");

  const isDisabled = () => {
    if (input.length === 0 || input.length > 20) return true;
    if (keywords.length >= 3) return true;
  }

  const handleAddKeyword = () => {
    if (isDisabled()) return;
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
    <div>
      <h2 className="text-2xl">ワード検索</h2>
      <form className="py-5">
        <label
          htmlFor="keyword-search"
          className="block mb-2 text-md font-medium text-gray-900"
        >キーワード</label>
        <input
          id = "keyword-search"
          className="border p-2 rounded w-3/4"
          type="text"
          value={input}
          onKeyDown={onKeyDownAddKeyword}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 ml-3 rounded disabled:bg-gray-400"
          onClick={onClickAddKeyword}
          disabled={isDisabled()}
        >追加</button>
        <p className="text-gray-500 text-sm">（20文字以下で入力してください。3つまでキーワードを検索できます。）</p>
      </form>

      <div className="flex space-x-4 mt-2">
        {keywords.length !== 0 ? keywords.map((keyword, index) => (
            <div data-testid={`chip`} key={index} className="bg-blue-500 hover:bg-blue-600 p-2 flex items-center rounded-lg">
              <span className="text-white">{keyword}</span>
              <button
                onClick={() => onClickDeleteKeyword(index)}
                className="ml-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
          : (
          <p className="text-gray-900">検索条件なし</p>
        )}
      </div>
    </div>
  );
}

export default KeywordSearch;
