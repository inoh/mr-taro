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
        <DiaryItem key={id} id={id} title={title} pages={pages} />
      ))}
    </List>
  );
};
