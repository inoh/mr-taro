const API_ENDPOINT = 'https://fusy5g07m4.execute-api.ap-northeast-1.amazonaws.com';

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
);

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

export {
  getDiaries,
  postDiary,
};
