import { UserActionTypes } from './user.types';

export interface IUser {
    username: string;
}


interface IStateUser {
    currentUser: IUser;
}


const INITIAL_STATE: IStateUser = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}


export default userReducer;