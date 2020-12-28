import React, { useState } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import TimeLabel from 'components/TimeLabel';
import { Diary } from './diariesSlice'
import { getDiaryAudioBuffer } from 'apis/diary'

const Note = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 15px;
`;

type Props = Diary

export const DiaryItem = ({ id, pages }: Props) => {
  const [opened, setOpened] = useState(false);

  const speech = async (diaryId: string, lang: string) => {
    const context = new AudioContext()
    const source = context.createBufferSource()
    source.buffer = await getDiaryAudioBuffer(context, diaryId, lang)
    source.connect(context.destination)
    source.start()
  }

  const jaOpenAndClose = () => {
    setOpened(!opened);
  }

  return (
    <>
      <TimeLabel date={new Date(pages.En.posted_at)} />

      <Note onClick={jaOpenAndClose}>{pages.En.note}</Note>
      {opened && <Note>{pages.Ja.note}</Note>}

      <Button onClick={() => speech(id, 'En')}>En</Button>
    </>
  );
}
