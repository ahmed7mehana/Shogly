import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  DailyReports:[],

}

export const DRSlice = createSlice({
  name: 'DailyReport',
  initialState,
  reducers: {
    setDR(state,action){
        state.DailyReports = action.payload;
    },
    deleteDR(state,action) {
      state.DR = state.DR.filter((p)=> p._id === action.payload);
    },


  },
})

const DRReducer =DRSlice.reducer
const DRAction =DRSlice.actions

export {DRReducer,DRAction}