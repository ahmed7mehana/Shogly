import request from "../../Utils/request";
import { thoughtAction } from "../Slice/ThoughtSlice";



export function createTHought(newThout) {
    return async (dispatch) => {
        const {data} =await request.post(`/api/thought/`,newThout)
        dispatch(thoughtAction.setThoughts(data))
    };
  }


  export function getAllThouhts() {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`/api/thought/`);
        dispatch(thoughtAction.setThoughts(data));
      } catch (error) {
        console.log(error);
      }
    };
  }
  
export function deleteThought(ThoughtID) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/thought/${ThoughtID}`);
      dispatch(thoughtAction.deleteThoughtID(data.ThoughtID));
    } catch (error) { console.log(error); }
  };
}

export function updateTHought(Nthoght,ThoughtID) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/thought/updateThought/${ThoughtID}`, Nthoght);
      dispatch(thoughtAction.setThoughts(data));
    } catch (error) {
      console.log(error);
    }
  };
}