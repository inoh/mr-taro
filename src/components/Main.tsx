import React from 'react';
import styled from 'styled-components';

import DiaryFrom from './DiaryForm';
import DiaryList from './DiaryList';

const StyledMain = styled.main`
  width: 500px;
  margin: 0 auto;
`;

const Main = () => (
  <StyledMain>
    <DiaryFrom />

    <DiaryList />
  </StyledMain>
);

export default Main;
