import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { getDiaries } from 'apis/diary'

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
}

const initialState: DiariesState = {
  entities: [],
}

export const diariesSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    diariesReceived(state, action) {
      state.entities = action.payload
    }
  },
})

const {
  diariesReceived,
} = diariesSlice.actions

export default diariesSlice.reducer

export const fetchDiaries = (): AppThunk => async dispatch => {
  const diaries = await getDiaries()
  const sortedDiaries = diaries.sort((before, after) => (
    (new Date(before.pages.En.posted_at) < new Date(after.pages.En.posted_at)) ? 1 : -1
  ))
  dispatch(diariesReceived(sortedDiaries))
}
