import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import TimeLabel from './TimeLabel';

const Note = styled.p`
  margin: 0;
  padding: 5px;
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
  const page: Page = diary.pages.En;

  const speech = async (diaryId: string) => {
    const context = new AudioContext();
    const response = await fetch(`${API_ENDPOINT}/diaries/${diaryId}/speech/En`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }

  return (
    <>
      <TimeLabel date={new Date(page.posted_at)} />

      <Note>{page.note}</Note>

      <Button onClick={() => speech(diary.id)}>En</Button>
    </>
  );
}

export default Diary;
