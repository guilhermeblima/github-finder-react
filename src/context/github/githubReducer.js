import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    CLEAR_USERS,
    SET_LOADING
} from '../types';

export default (state, action) => {
    switch(action.type){
        case SEARCH_USERS:
            return {
                ...state, 
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state, 
                loading: true
            }
        case GET_USER:
            return {
                ...state, 
                user: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state, 
                repos: action.payload, 
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state, 
                users: [], 
                loading: false
            }
        default:
            return state;
    }
}