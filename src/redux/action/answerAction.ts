import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dispatch} from "@reduxjs/toolkit";
export const CHANGE_ANSWER = 'CHANGE_ANSWER';
export const RESET_ANSWER = 'RESET_ANSWER';

export const changeAnswer = (data: any) => (dispatch: Dispatch) => {
  AsyncStorage.setItem('answers', JSON.stringify(data)).then(() => {
    dispatch({
      type: CHANGE_ANSWER,
      payload: data,
    })
  });
};

export const resetAnswer = () => (dispatch: Dispatch) => {
   AsyncStorage.removeItem('answers').then(() => {
    dispatch({
      type:RESET_ANSWER,
    })
  })
}
