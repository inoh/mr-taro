import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Diary from './Diary';

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

const API_ENDPOINT = 'https://fusy5g07m4.execute-api.ap-northeast-1.amazonaws.com'

const DiaryList = () => {
  const [diaries, setDiaries] = useState<any>([]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/diaries`)
      .then(response => response.json())
      .then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <List>
      {diaries.map((diary: any) => (
        <ListItem key={diary.id}>
          <Diary diary={diary} />
        </ListItem>
      ))}
    </List>
  );
};

export default DiaryList;
