import { UserActionTypes } from './user.types';

interface IState {
    currentUser: {
        username: string;
    }
}

const INITIAL_STATE: IState = {
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