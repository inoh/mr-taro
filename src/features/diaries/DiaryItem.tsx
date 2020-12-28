import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from 'app/rootReducer'
import Button from 'components/Button'
import TimeLabel from 'components/TimeLabel'
import { Diary } from './diariesSlice'
import { getDiaryAudioBuffer } from 'apis/diary'

const Item = styled.li<{ isLatest: boolean }>`
  padding: 10px;
  border-bottom: 1px solid rgba(38, 0, 51, 1);
  background-color: #fff;
  ${({ isLatest }) => isLatest && "box-shadow: inset 0 10px 25px 0 rgba(38, 0, 51, 0.1);"}
`;

const Note = styled.p`
  margin: 0;
  padding: 5px;
  font-size: 15px;
`;

type Props = Diary

export const DiaryItem = ({ id, pages }: Props) => {
  const [opened, setOpened] = useState(false);
  const {
    latestAddedDiaryId,
  } = useSelector((state: RootState) => state.diaries)

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
    <Item isLatest={id === latestAddedDiaryId}>
      <TimeLabel date={new Date(pages.En.posted_at)} />

      <Note onClick={jaOpenAndClose}>{pages.En.note}</Note>
      {opened && <Note>{pages.Ja.note}</Note>}

      <Button onClick={() => speech(id, 'En')}>En</Button>
    </Item>
  );
}
