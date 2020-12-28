import React from "react"
import styled from 'styled-components'

import Header from "./Header"
import { Diaries } from 'features/diaries'

const Container = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
`

const App = () => (
  <Container>
    <Header />
    <main>
      <Diaries />
    </main>
  </Container>
)

export default App
