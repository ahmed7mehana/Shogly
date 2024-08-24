import request from "../../Utils/request";
import { DRAction } from "../Slice/DailyRepo";


export function createDR(DRD) {
    return async (dispatch) => {
        const {data} =await request.post(`/api/DailyReport/`,DRD)
        dispatch(DRAction.setDR(data))
    };
  }


  export function GetAllDR() {
    return async (dispatch) => {
        const {data} =await request.get(`/api/DailyReport/`)
        dispatch(DRAction.setDR(data))
    };
  }


  export function deleteDR(DRid) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.delete(`/api/DailyReport/${DRid}`);
        dispatch(DRAction.deleteDR(data.ThoughtID));
      } catch (error) { console.log(error); }
    };
  }
  

export function updateDR(nDR,DRid) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/DailyReport/updateDailyReport/${DRid}`, nDR);
      dispatch(DRAction.setDR(data));
    } catch (error) {
      console.log(error);
    }
  };
}