import React from "react";
import { KeywordHit } from "../types/types";

type Props = {
  keywordHits: KeywordHit[] | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
};

const DisplayKeywordHits: React.FC<Props> = (props) => {
  const { keywordHits, setActiveId } = props;

  const scrollToHit = (index: number) => {
    const id = `hit-${index}`;
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    setActiveId(id);
    window.setTimeout(
      () => setActiveId((prev) => (prev === id ? null : prev)),
      1800,
    );
  };

  if (!keywordHits || keywordHits.length === 0)
    return (
      <div className="py-5">
        <p className="text-md">検索結果がありません。</p>
      </div>
    );

  return (
    <div className="">
      <div className="py-5 text-xl text-gray-900">
        {keywordHits.map((kwHit, index) => (
          <button
            key={index}
            className="border block w-full my-1 p-3"
            onClick={() => scrollToHit(index)}
          >
            <p className="truncate">
              {kwHit.aroundText.before}
              <span className="text-red-400">{kwHit.aroundText.match}</span>
              {kwHit.aroundText.after}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisplayKeywordHits;
