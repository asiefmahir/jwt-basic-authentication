/**
 * @exports
 */
export const initialState = {
    token: '',
    user: null,
    errors: {}
}

/**
 * @name AppReducer
 * @param {Object} state 
 * @param {Object} action 
 */
const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN': {
            let { token, user } = state;
            token = action.payload.token;
            user = action.payload.user
            return { ...state, token, user }
        }
        case 'SIGN_UP': {
            let { user } = state;
            user = action.payload;
            return { ...state, user }
        }
        case 'LOG_OUT': {
            let { token, user } = state;
            token = '';
            user = null
            return { ...state, token, user }
        }
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload.user,
            }
        }
        default:
            return state
    }
}

export default AppReducer