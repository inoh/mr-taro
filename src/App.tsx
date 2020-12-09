import React from "react";
import styled from 'styled-components';

import Header from "./components/Header";
import Main from "./components/Main";

const Container = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {

  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
}

export default App;
