export type Model = {
  name: string;
  language: string;
}


export type KeywordHit = {
  keyword: string;
  start: number;
  end: number;
  aroundText: {
    before: string;
    after: string;
    match: string;
  }
}

