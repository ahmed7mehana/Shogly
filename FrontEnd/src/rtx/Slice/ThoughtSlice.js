import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Thoughts:[],

}

export const ThoughtSlice = createSlice({
  name: 'thought',
  initialState,
  reducers: {
    setThoughts(state,action){
        state.Thoughts = action.payload;
    },
    deleteThoughtID(state,action) {
      state.Thoughts = state.Thoughts.filter((p)=> p._id === action.payload);
    },


  },
})

const thoughtReducer =ThoughtSlice.reducer
const thoughtAction =ThoughtSlice.actions

export {thoughtAction,thoughtReducer}