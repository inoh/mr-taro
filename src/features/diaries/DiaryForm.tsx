import React from "react";
import { useDispatch } from 'react-redux'
import styled from "styled-components";
import { useForm } from 'react-hook-form'

import Button from 'components/Button'
import { saveDiary } from './diariesSlice'

const StyledForm = styled.form`
  width: 100%;
  padding: 0;
`

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(38, 0, 51, 1);
  padding: 15px;
  font-size: 19px;
  border-radius: 5px;
  outline: none;
  resize: none;
  box-sizing: border-box;
`

const SubmitButton = styled(Button)`
  margin-top: 10px;
  padding: 10px 0;
  width: 130px;
  border: 2px solid rgba(38, 0, 51, 1);
  font-size: 19px;
  font-weight: bold;
  border-radius: 20px;
`

type SubmitData = {
  note: string
}

export const DiaryForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = handleSubmit<SubmitData>(async (data: any) => {
    await dispatch(saveDiary(data.note));
    reset();
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <TextArea name="note" ref={register} />

      <SubmitButton>WRITE</SubmitButton>
    </StyledForm>
  )
}
