
const URL = 'https://speech2text-backend-motoya-nonaka-speech2text-backend.apps.687717108a3a4d1edcbc3cee.ap1.techzone.ibm.com'

export const recognize = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);

  const res = await fetch(`${URL}/api/v1/recognize`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json();
  return data;
}

export const getModelList = async () => {
  try {
    const res = await fetch(`${URL}/api/v1/models`)
    const data = res.json()
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error in getModelList: ${error}`);
  }
}
