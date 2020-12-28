import { combineReducers } from '@reduxjs/toolkit'

import diariesReducer from 'features/diaries/diariesSlice'

const rootReducer = combineReducers({
  diaries: diariesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
