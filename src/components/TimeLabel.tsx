import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: rgb(0, 0, 0, 0.7);
  font-size: 15px;
`;

interface TimeLabelProps {
  date: Date;
}

const TimeLabel = ({ date }: TimeLabelProps) => (
  <Label>{date.toDateString()}</Label>
);

export default TimeLabel;
