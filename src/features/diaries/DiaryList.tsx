import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from 'app/rootReducer'
import { DiaryItem } from './DiaryItem'
import { fetchDiaries } from './diariesSlice'

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

export const DiaryList = () => {
  const dispatch = useDispatch()
  const {
    entities: diaries,
  } = useSelector((state: RootState) => state.diaries)

  useEffect((): void => {
    dispatch(fetchDiaries())
  }, [dispatch]);

  if (!diaries) return <></>

  return (
    <List>
      {diaries.map(({ id, title, pages }) => (
        <ListItem key={id}>
          <DiaryItem id={id} title={title} pages={pages} />
        </ListItem>
      ))}
    </List>
  );
};
