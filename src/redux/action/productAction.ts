
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const SET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
export const DELETE_PRODUCT_LOADING = 'DELETE_PRODUCT_LOADING';
export const ADD_PRODUCT_LOADING = 'ADD_PRODUCT_LOADING';


export const getData = () => (dispatch: Dispatch) => {
    dispatch({
        type:SET_PRODUCT_LOADING
    })
    axios({
        method: 'GET',
        url: config.PRODUCT
    }).then(res => {
        dispatch({
            type: GET_DATA,
            data: res.data
        })
    }).catch(e => console.log(e))
}

export const addData = (name:string,avatar:string,cost:Number,description:string) => (dispatch:Dispatch) => {
    dispatch({
        type:ADD_PRODUCT_LOADING
    })
    axios({
        method:'POST',
        url: config.ADD_PRODUCT,
        data:{
            name:name,
            avatar:avatar,
            cost:cost,
            description:description
        }
    }).then(res => {
        dispatch({
            type:'ADD_DATA',
            data:res.data
        })
    }).catch(e => console.log(e))
}

export const deleteData = (id: string) => (dispatch: Dispatch) => {
    dispatch({
        type:DELETE_PRODUCT_LOADING
    })
    axios({
        method: 'DELETE',
        url: config.DELETE + `${id}`
    }).then(res => {
        dispatch({
            type: 'DELETE_DATA',
            data: res.data.id
        })
    })
        .catch(e => console.log(e))
}