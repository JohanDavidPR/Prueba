import {
    GET_PETS,
    GET_PET,
    PROCESS_FAILURE,
    ADD_PET,
    UPDATE_PET,
    DELETE_PET,
    LOADING,
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const {payload, type} = action
    switch(type){
        case GET_PET:
            return {
                ...state,
                loading: false,
                error: false,
                pet: payload
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case GET_PETS:
            return {
                ...state,
                loading: false,
                error: false,
                pets: payload
            }
        case PROCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case ADD_PET:
            return {
                ...state,
                loading: false,
                error: false,
                pets: [...state, payload]
            }
        case UPDATE_PET:
            return {
                ...state,
                loading: false,
                error: false,
                pet: payload,
                pets: state.pets.map( pet => {
                    if( pet.id === payload.id ){
                        return payload
                    }
                    return pet
                } )
            }
        case DELETE_PET:
            return {
                ...state,
                loading: false,
                error: false,
                pets: state.pets.filter( pet => pet.id !== payload )
            }
        default:
            return state;
    }

}