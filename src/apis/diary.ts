const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

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

const getDiaryAudioSource = async (
  diaryId: string,
  lang: string,
): Promise<AudioBufferSourceNode> => {
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const response = await fetch(`${API_ENDPOINT}/diaries/${diaryId}/speech/${lang}`);
  const arrayBuffer = await response.arrayBuffer();
  return new Promise((resolve) => {
    const source = context.createBufferSource()
    context.decodeAudioData(arrayBuffer, (buffer) => {
      source.buffer = buffer
      source.connect(context.destination)
      resolve(source)
    })
  })
}

export {
  getDiaries,
  postDiary,
  getDiaryAudioSource,
};
