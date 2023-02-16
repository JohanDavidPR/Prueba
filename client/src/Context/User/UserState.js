import React, {useReducer} from 'react'
import axios from 'axios'

import UserContext from './UserContext';
import UserReducer from './UserReducer';

const UserState = (props) => {

    const ruta = "https://localhost:7198";

    const inicialState = {
        clients: [],
        client: {},
        user: {},
        loading: false,
        error: false,
        toggle: false,
    }

    const [state, dispatch] = useReducer(UserReducer, inicialState)

    const saveAutenticarUser = (datos) => {
        dispatch({
            type: 'VALIDAR_USER',
            payload: datos
        })
    }

    const toggleMenu = () => {
        dispatch({
            type: 'TOGGLE_MENU',
            payload: null
        })
    }

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

    const userStorageAuth = () => {
        state.loading = true;
        const elem = window.localStorage.getItem('myVetSession')
        const dato = elem ? JSON.parse(elem) : null
        if( dato != null ){
            saveAutenticarUser(dato);           
        }
        else {
            processFailure()
        }
    }

    const userAuth = async ( datos ) => {
        try {
            const data = await axios.post(ruta+'/authenticate', datos);
            window.localStorage.setItem('myVetSession', JSON.stringify(data.data.data));
            saveAutenticarUser(data.data.data);
        } catch (error) {
            console.log(error);
            processFailure()
        }
    }

    const closeSession = () => {
        try {
            window.localStorage.removeItem('myVetSession');
            saveAutenticarUser([])
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const registerUser = async (datos) => {
        try{
            state.loading = true;
            const res = await axios.post(ruta+'/user', datos);
            if( res.data.data ) saveAutenticarUser(res.data.data)
            else processFailure()
        }catch(e){
            console.log(e)
            processFailure()
        }
    }

    const getUser = async (dato) => {
        try {
            const res = await axios.get(ruta+'/user/'+dato)
            dispatch({
                type: 'GET_USER',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const getClients = async () => {
        try {
            const res = await axios.get(ruta+'/clients')
            dispatch({
                type: 'GET_CLIENT',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const updateUser = async (user, data) => {
        try {
            const res = await axios.put(ruta+'/user/'+user, data)
            dispatch({
                type: 'UPDATE_USER',
                payload: res.data.data
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    const daleteUser = async (user) => {
        try {
            const res = await axios.delete(ruta+'/user/'+user)
            dispatch({
                type: 'DELETE_USER',
                payload: user
            })
        } catch (error) {
            console.log(error)
            processFailure()
        }
    }

    return (
        <UserContext.Provider value={{
            clients: state.clients,
            client: state.client,
            user: state.user,
            loading: state.loading,
            error: state.error,
            userStorageAuth,
            userAuth,
            closeSession,
            registerUser,
            getUser,
            getClients,
            updateUser,
            daleteUser,
            startLoading,
            toggleMenu
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;