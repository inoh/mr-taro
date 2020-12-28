const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export interface Diary {
  id: string;
  title: string;
  pages: {
    Ja: Page;
    En: Page;
  }
}

interface Page {
  note: string;
  posted_at: string;
}

const getDiaries = (): Promise<[Diary]> => (
  fetch(`${API_ENDPOINT}/diaries`)
    .then(response => response.json())
)

const postDiary = (note: string): Promise<Diary> => (
  fetch(
    `${API_ENDPOINT}/diaries/En`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: note,
        note: note,
      })
    }
  )
    .then(response => response.json())
)

const getDiaryAudioBuffer = async (context: any, diaryId: string, lang: string): Promise<AudioBuffer> => {
  const response = await fetch(`${API_ENDPOINT}/diaries/${diaryId}/speech/${lang}`);
  const arrayBuffer = await response.arrayBuffer();
  return await context.decodeAudioData(arrayBuffer);
}

export {
  getDiaries,
  postDiary,
  getDiaryAudioBuffer,
};
