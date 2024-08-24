import { configureStore } from '@reduxjs/toolkit'
import { thoughtReducer } from './Slice/ThoughtSlice'
import { DRReducer } from './Slice/DailyRepo'

const store = configureStore({
  reducer: {
    thought:thoughtReducer ,
    DailyReport:DRReducer,
  },
})

export default store