import React,{useReducer} from 'react';
import mercantilContext from './mercantilContext';
import mercantilReducer from './mercantilReducer';
import clientAxios from '../../config/axios';
import {PAGAR_MERCANTIL,SET_LOADING} from '../../types'


const MercantilState= props=>{

    const initialState={
        payment:false,
        loading:false,
        response:null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(mercantilReducer, initialState)

    //mostrar formulario
    const pagar= async datos=>{
        try {
            console.log(datos);
            const response= await clientAxios.post('/payment_mercantil_tdc',datos);
            console.log(response)
            dispatch({
                type:PAGAR_MERCANTIL,
                payload:response.data
            })
        } catch (error) {
            console.log(error)
            // const alert={
            //     msg:error.response.data.msg,
            //     categoria:'alerta-error'
            // }
            // dispatch({
            //     type:PAGAR_MERCANTIL,
            //     payload:alert
            // })
        }
    }

    //view loading
    const setLoading= condition=>{
        dispatch({
            type:SET_LOADING,
            payload:condition
        })
    }

    return (
        <mercantilContext.Provider
            value={{
                payment:state.payment,
                loading:state.loading,
                setLoading,
                pagar
            }}
        >
            {props.children}
        </mercantilContext.Provider>
    )
}
export default MercantilState;