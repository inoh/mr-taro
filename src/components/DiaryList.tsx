import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './Button';

const List = styled.ul`
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid rgba(38, 0, 51, 1);
  background-color: #fff;
`;

const Note = styled.p`
  margin: 0;
  padding: 5px;
`;

const API_ENDPOINT = 'https://fusy5g07m4.execute-api.ap-northeast-1.amazonaws.com'

const DiaryList = () => {
  const [diaries, setDiaries] = useState<any>([]);

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

  useEffect(() => {
    fetch(`${API_ENDPOINT}/diaries`)
      .then(response => response.json())
      .then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <List>
      {diaries.map((diary: any) => (
        <ListItem key={diary.id}>
          <Note>{diary.pages.En.note}</Note>

          <Button onClick={() => speech(diary.id)}>En</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DiaryList;
