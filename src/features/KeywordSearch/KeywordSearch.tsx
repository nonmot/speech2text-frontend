import { useState, useEffect } from "react";
import { keywordSearch } from "../../api/api";
import KeywordSearchForm from "../../components/KeywordSearchForm";
import KeywordSearchResult from "../../components/KeywordSearchResult";
import type { KeywordHit } from "../../types/types";

type Props = {
  transcript: string | null;
  keywordHits: KeywordHit[] | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  setKeywordsHits:  React.Dispatch<React.SetStateAction<KeywordHit[]| null>>;
}

const KeywordSearch: React.FC<Props> = (props) => {

  const { transcript, keywordHits, setKeywordsHits, setActiveId } = props;

  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    const Search = async () => {
      if (!transcript) return;
      const highlights = await keywordSearch(transcript, keywords);
      setKeywordsHits(highlights.highlights);
    }

    Search();
    // eslint-disable-next-line
  }, [keywords]);

  const onClickDeleteKeyword = (index: number) => {
    if (!keywords) return;
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <>
      <KeywordSearchForm
        keywords={keywords}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
      <KeywordSearchResult
        keywordHits={keywordHits}
        setActiveId={setActiveId}
      />
    </>
  )
}

export default KeywordSearch;
