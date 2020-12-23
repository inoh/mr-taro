import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Diary from './Diary';
import { getDiaries, Diary as DiaryProps } from '../apis/diary';

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

const DiaryList = () => {
  const [diaries, setDiaries] = useState<[DiaryProps]>();

  useEffect(() => {
    getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <List>
      {diaries && diaries.map((diary: any) => (
        <ListItem key={diary.id}>
          <Diary diary={diary} />
        </ListItem>
      ))}
    </List>
  );
};

export default DiaryList;
