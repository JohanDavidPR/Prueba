import {
    GET_CLIENT,
    VALIDAR_USER,
    PROCESS_FAILURE,
    DELETE_USER,
    UPDATE_USER,
    LOADING,
    TOGGLE_MENU
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const {payload, type} = action
    switch(type){
        case TOGGLE_MENU:
            return {
                ...state,
                loading: false,
                error: false,
                toggle: !state.toggle
            }
        case GET_CLIENT:
            return {
                ...state,
                loading: false,
                error: false,
                clients: payload
            }
        case VALIDAR_USER:
            return {
                ...state,
                loading: false,
                error: false,
                user: payload
            }
        case PROCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case DELETE_USER:
            return {
                ...state,
                loading: false,
                error: false,
                clients: state.clients.filter(client => client.id !== payload)
            }
        case UPDATE_USER:
            return {
                ...state,
                loading: false,
                error: false,
                clients: state.clients.map(client => {
                    if( client.id === payload.id ){
                        return payload
                    }
                    return client
                })
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }
        default:
            return state;
    }

}