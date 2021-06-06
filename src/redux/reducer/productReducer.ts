import { GET_DATA,ADD_DATA,DELETE_DATA,SET_PRODUCT_LOADING,DELETE_PRODUCT_LOADING,ADD_PRODUCT_LOADING } from "../action/productAction";

const initialValue = {
    isLoading: false,
    productList: []
}

export default function productReducer(state = initialValue, action: any) {
    switch (action.type) {
        case SET_PRODUCT_LOADING:
            return {
                isLoading:true,
                productList:[]
            }
        case ADD_PRODUCT_LOADING:
            return {
                ...state,
                isLoading:true,
            }
        case DELETE_PRODUCT_LOADING:
            return {
                ...state,
                isLoading:true,
            }
        case GET_DATA:
            return {
                isLoading:false,
                productList: action.data
            }
        case ADD_DATA:
            return {
                isLoading:false,
                productList: [...state.productList, action.data]
            }
        case DELETE_DATA:
            console.log(state.productList)
            return {
                isLoading:false,
                productList: state.productList.filter((pro: any) => pro.id !== action.data)
            }
        default:
            return state;
    }
}