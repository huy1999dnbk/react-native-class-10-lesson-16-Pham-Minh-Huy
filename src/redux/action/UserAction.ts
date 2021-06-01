import AsyncStorage from "@react-native-async-storage/async-storage";
import {Dispatch} from "@reduxjs/toolkit";
export const RESET_USER = 'RESET_USER';
export const CHANGE_USER = 'CHANGE_USER';

export const changeUser = (data: any) => (dispatch: Dispatch) => {
  AsyncStorage.setItem('userName', data.name).then(() => {
    dispatch({
      type: CHANGE_USER,
      payload: {
        username: data.name,
        password: data.password
      }
    })
  })
}

export const resetUser = () => ({
  type:RESET_USER
})
