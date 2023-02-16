import {
    GET_CLINICAL_HISTORY,
    PROCESS_FAILURE,
    GET_RECORD,
    ADD_REGISTER,
    LOADING,
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const {payload, type} = action
    switch(type){
        case GET_RECORD:
            return {
                ...state,
                loading: false,
                error: false,
                record: payload
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case GET_CLINICAL_HISTORY:
            return {
                ...state,
                loading: false,
                error: false,
                clinical: payload
            }
        case PROCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case ADD_REGISTER:
            return {
                ...state,
                loading: false,
                error: false,
                clinical: {
                    ...state.clinical,
                    registers: [...state.clinical.registers, payload]
                }
            }
        default:
            return state;
    }

}