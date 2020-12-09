import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import TimeLabel from './TimeLabel';

const Note = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 15px;
`;

const API_ENDPOINT = 'https://fusy5g07m4.execute-api.ap-northeast-1.amazonaws.com'

type Diary = {
  id: string;
  title: string;
  pages: any;
}

type Page = {
  note: string;
  posted_at: string;
}

interface DiaryProps {
  diary: Diary;
}

const Diary = ({ diary }: DiaryProps) => {
  const en_page: Page = diary.pages.En;
  const ja_page: Page = diary.pages.Ja;

  const speech = async (diaryId: string, lang: string) => {
    const context = new AudioContext();
    const response = await fetch(`${API_ENDPOINT}/diaries/${diaryId}/speech/${lang}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }

  return (
    <>
      <TimeLabel date={new Date(en_page.posted_at)} />

      <Note>{en_page.note}</Note>

      <Button onClick={() => speech(diary.id, 'En')}>En</Button>
    </>
  );
}

export default Diary;
