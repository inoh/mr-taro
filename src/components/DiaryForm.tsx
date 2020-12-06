import React from "react";
import styled from "styled-components";
import { useForm } from 'react-hook-form';

import Button from './Button';

const StyledForm = styled.form`
  width: 100%;
  padding: 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(38, 0, 51, 1);
  padding: 15px;
  font-size: 19px;
  border-radius: 5px;
  outline: none;
  resize: none;
  box-sizing: border-box;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
  padding: 10px 0;
  width: 130px;
  border: 2px solid rgba(38, 0, 51, 1);
  font-size: 19px;
  font-weight: bold;
  border-radius: 20px;
`;

type SubmitData = {
  note: string
};

const API_ENDPOINT = 'https://fusy5g07m4.execute-api.ap-northeast-1.amazonaws.com'

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit<SubmitData>(async (data: any) => {
    const response = await fetch(
      `${API_ENDPOINT}/diaries/En`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.note,
          note: data.note,
        })
      }
    );
    console.log(await response.json());
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <TextArea name="note" ref={register} />

      <SubmitButton>WRITE</SubmitButton>
    </StyledForm>
  );
};

export default Form;
