import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Header = () => (
  <StyledHeader>
    <Title>Moment Journal</Title>
  </StyledHeader>
);

export default Header;
