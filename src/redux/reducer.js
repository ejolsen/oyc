import axios from 'axios';

const initialState = {
    user: {},
    user_info: {}
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_PROFILE_INFO = 'GET_PROFILE_INFO';

export function getUser() {
    let userData = axios.get('/auth/me').then(res => {
        return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getUserInfo() {
    let userInfo = axios.get('/api/user_profile_info/').then(res => {
        return res.data;
    })
    return {
        type: GET_PROFILE_INFO,
        payload: userInfo
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case GET_PROFILE_INFO + '_FULFILLED':
            return Object.assign({}, state, {user_info: action.payload})
        default: 
        return state;
    }
}