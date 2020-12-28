import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Microphone } from '@styled-icons/boxicons-solid'

import { RootState } from 'app/rootReducer'
import TimeLabel from 'components/TimeLabel'
import { Diary } from './diariesSlice'
import { getDiaryAudioBuffer } from 'apis/diary'

const Item = styled.li<{ opened: boolean }>`
  padding: 10px;
  border-bottom: 1px solid rgba(38, 0, 51, 1);
  background-color: #fff;
  ${({ opened }) => opened && "box-shadow: inset 0 10px 25px 0 rgba(38, 0, 51, 0.1);"}
`

const Note = styled.p`
  margin: 0;
  padding: 10px 10px 0 10px;
  font-size: 15px;
`

const StyledMicrophone = styled(Microphone)`
  cursor: pointer;
  width: 16px;
  margin-right: 5px;
  vertical-align: bottom;

  :hover {
    opacity: 0.3;
  }
`

type Props = Diary

export const DiaryItem = ({ id, pages }: Props) => {
  const {
    latestAddedDiaryId,
  } = useSelector((state: RootState) => state.diaries)
  const [opened, setOpened] = useState(!!latestAddedDiaryId);

  useEffect(() => {
    if (id === latestAddedDiaryId) {
      speech(latestAddedDiaryId)
    }
  }, [latestAddedDiaryId])

  const speech = async (diaryId: string) => {
    const context = new AudioContext()
    const source = context.createBufferSource()
    source.buffer = await getDiaryAudioBuffer(context, diaryId, 'En')
    source.connect(context.destination)
    source.start()
  }

  const jaOpenAndClose = () => {
    setOpened(!opened)
  }

  return (
    <Item opened={opened}>
      <StyledMicrophone onClick={() => speech(id)} />
      <TimeLabel date={new Date(pages.En.posted_at)} />

      <Note onClick={jaOpenAndClose}>{pages.En.note}</Note>
      {opened && <Note>{pages.Ja.note}</Note>}
    </Item>
  )
}
