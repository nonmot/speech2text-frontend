import React from "react";
import type { KeywordHit } from "../types/types";

type Props = {
  transcript: string | null;
  keywordHits: KeywordHit[] | null;
  activeId: string | null;
};

const DisplayTranscript: React.FC<Props> = (props) => {
  const { transcript, keywordHits, activeId } = props;

  const fullNodes = () => {
    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    keywordHits?.forEach((hit, index) => {
      const id: string = `hit-${index}`;
      if (hit.start > cursor) {
        nodes.push(
          <span key={`t-${cursor}`}>
            {transcript?.slice(cursor, hit.start)}
          </span>,
        );
      }
      nodes.push(
        <mark
          key={id}
          id={id}
          className={
            "rounded px-0.5 " +
            (activeId === id
              ? "bg-yellow-300 ring-2 ring-yellow-400"
              : "bg-yellow-200")
          }
        >
          {transcript?.slice(hit.start, hit.end)}
        </mark>,
      );
      cursor = hit.end;
    });

    if (transcript && cursor < transcript?.length) {
      nodes.push(<span key={`t-${cursor}`}>{transcript?.slice(cursor)}</span>);
    }
    return nodes;
  };

  if (!transcript)
    return (
      <div className="py-5">
        <p></p>
      </div>
    );

  if (transcript === "")
    return (
      <div className="py-5">
        <p>文字起こし結果がありません。</p>
      </div>
    );

  return <div className="py-5 text-xl text-gray-900">{fullNodes()}</div>;
};

export default DisplayTranscript;
