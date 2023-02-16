import React, {useReducer} from 'react'
import axios from 'axios' 

import PetContext from './PetContext';
import PetReducer from './PetReducer'

const PetState = (props) => {

    const ruta = "https://localhost:7198";

    const inicialState = {
        pets: [],
        pet: {},
        loading: false,
        error: false,
    }

    const [state, dispatch] = useReducer(PetReducer, inicialState)

    const processFailure = () => {
        dispatch({
            type: 'PROCESS_FAILURE',
            payload: true
        })
    }

    const startLoading = () => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
    }

    const getPet = async (dato) => {
        try {
            console.log(dato)
            const res = await axios.get(ruta+'/pet/'+dato)
            console.log(res.data)
            dispatch({
                type: 'GET_PET',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const getPets = async () => {
        try {
            const res = await axios.get(ruta+'/pets')
            dispatch({
                type: 'GET_PETS',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const addPet = async (data) => {
        try {
            const res = await axios.post(ruta+'/pets', data)
            dispatch({
                type: 'ADD_PET',
                payload: data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const updatePet = async (pet, data) => {
        try {
            const res = await axios.put(ruta+'/pet/'+pet, data)
            dispatch({
                type: 'UPDATE_PET',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const deletePet = async (pet) => {
        try {
            const res = await axios.delete(ruta+'/pet/'+pet)
            dispatch({
                type: 'DELETE_PET',
                payload: pet
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    return (
        <PetContext.Provider value={{
            pets: state.pets,
            pet: state.pet,
            loadingPet: state.loading,
            error: state.error,
            getPet,
            getPets,
            addPet,
            updatePet,
            deletePet,
            startLoadingPet: startLoading
        }}>
            {props.children}
        </PetContext.Provider>
    )
}

export default PetState;