import {RESET_USER,CHANGE_USER} from "../action/UserAction";

const initialValue = {
    username:'',
    password:''
};

export default function userReducer(state = initialValue, action: any) {
    switch (action.type) {
        case CHANGE_USER:
            return action.payload
        case RESET_USER:
            return initialValue;
        default:
            return state;
    }
}
