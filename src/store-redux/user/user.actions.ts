import { UserActionTypes } from './user.types';


export const setCurrentUser = (user: {username: string;}) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});
