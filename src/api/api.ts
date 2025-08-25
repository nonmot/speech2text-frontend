import type { Model } from '../types/types';

const URL =
  'https://speech2text-backend-motoya-nonaka-speech2text-backend.apps.687717108a3a4d1edcbc3cee.ap1.techzone.ibm.com';

export const recognize = async (file: File, model: Model) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', model.name);

  const res = await fetch(`${URL}/api/v1/recognize`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const keywordSearch = async (text: string, keywords: string[]) => {
  if (!text || keywords.length === 0) return { highlight: [] };
  const res = await fetch(`${URL}/api/v1/search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      keywords: keywords,
    }),
  });
  const data = await res.json();
  return data;
};

export const getModelList = async () => {
  try {
    const res = await fetch(`${URL}/api/v1/models`);
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error in getModelList: ${error}`);
  }
};
