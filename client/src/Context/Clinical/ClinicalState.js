import React, {useReducer} from 'react'
import axios from 'axios'

import ClinicalReducer from './ClinicalReducer';
import ClinicalContext from './ClinicalContext';

const ClinicalState = (props) => {

    const ruta = "https://localhost:7198";

    const inicialState = {
        clinical: {},
        record: {},
        loading: false,
        error: false,
    }

    const [state, dispatch] = useReducer(ClinicalReducer, inicialState)

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

    const getRegister = async (dato) => {
        try {
            const res = await axios.get(ruta+'/clinical/'+dato)
            dispatch({
                type: 'GET_RECORD',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const getClinical = async (pet) => {
        try {
            const res = await axios.get(ruta+'/clinical/'+pet)
            dispatch({
                type: 'GET_CLINICAL_HISTORY',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const addRegister = async (data) => {
        try {
            const res = await axios.post(ruta+'/clinical', data)
            dispatch({
                type: 'ADD_REGISTER',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    return (
        <ClinicalContext.Provider value={{
            clinical: state.clinical,
            loadingClinical: state.loading,
            error: state.error,
            getClinical,
            getRegister,
            addRegister,
            startLoadingClinical: startLoading
        }}>
            {props.children}
        </ClinicalContext.Provider>
    )
}

export default ClinicalState;
