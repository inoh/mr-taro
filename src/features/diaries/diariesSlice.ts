import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { postDiary, getDiaries } from 'apis/diary'

export type Diary = {
  id: string
  title: string
  pages: PageList
}

type PageList = {
  Ja: Page
  En: Page
}

type Page = {
  note: string
  posted_at: string
}

export type DiariesState = {
  entities: Diary[]
  latestAddedDiaryId?: string
}

const initialState: DiariesState = {
  entities: [],
}

export const diariesSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    diarySaved(state, { payload }: PayloadAction<Diary>) {
      state.entities.unshift(payload)
      state.latestAddedDiaryId = payload.id
    },
    diariesReceived(state, { payload }: PayloadAction<Diary[]>) {
      state.entities = payload
    },
  },
})

const {
  diarySaved,
  diariesReceived,
} = diariesSlice.actions

export default diariesSlice.reducer

export const saveDiary = (note: string): AppThunk => async dispatch => {
  const diary = await postDiary(note)
  dispatch(diarySaved(diary))
}

export const fetchDiaries = (): AppThunk => async dispatch => {
  const diaries = await getDiaries()
  const sortedDiaries = diaries.sort((before, after) => (
    (new Date(before.pages.En.posted_at) < new Date(after.pages.En.posted_at)) ? 1 : -1
  ))
  dispatch(diariesReceived(sortedDiaries))
}
