import React,{useReducer} from 'react';
import payContext from './payContext';
import payReducer from './payReducer';
import {SET_LOADING,CHANGE_COIN,CHANGE_METHOD,FORM_PAYMENT,PAYMENT} from '../../types'
import clientAxios from '../../config/axios';

const PayState= props=>{

    const years = []
    const currentYear=parseInt(new Date().getFullYear().toString().substr(-2));
    for (let i = currentYear; i < currentYear+11; i++) {
        years.push(<option value={i} key={i}>20{i}</option>)
    }

    const initialState={
        years:years,
        loading:false,
        months:[
            {'value':'1','description':'Enero'},
            {'value':'2','description':'Febrero'},
            {'value':'3','description':'Marzo'},
            {'value':'4','description':'Abril'},
            {'value':'5','description':'Mayo'},
            {'value':'6','description':'Junio'},
            {'value':'7','description':'Julio'},
            {'value':'8','description':'Agosto'},
            {'value':'9','description':'Septiembre'},
            {'value':'10','description':'Octubre'},
            {'value':'11','description':'Noviembre'},
            {'value':'12','description':'Diciembre'}
        ],
        coins:[
            {'value':'ds','description':'Dólares'},
            {'value':'bs','description':'Bolívares'},
        ],
        selectedCoin:'',
        methods:[
            {'value':'debit','description':'Débito','icon':'https://lh3.googleusercontent.com/AQr_BmRd7jFGlVPoxZpMxQmJd7KfpjyRLPmBtsGILHykperqmko2llc6xw9Hzn2i-g', 'coin':'bs'},
            {'value':'credit','description':'Tarjeta de crédito','icon':'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcIX7LEB18sDOGkVKvBjTFtNtpLoBKOEd3Vw&usqp=CAU', 'coin':'bs'},
            {'value':'zelle','description':'Zelle','icon':'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcIX7LEB18sDOGkVKvBjTFtNtpLoBKOEd3Vw&usqp=CAU', 'coin':'ds'},
        ],
        selectedMethods:null,
        method:'',
        payment:false,
        processPayment:false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(payReducer, initialState)

    //view loading
    const setLoading= condition=>{
        dispatch({
            type:SET_LOADING,
            payload:condition
        })
    }

    //changeCoin
    const changeCoin= coin=>{
        dispatch({
            type:CHANGE_COIN,
            payload:coin
        })
    }

    //changeMethod
    const changeMethod= method=>{
        dispatch({
            type:CHANGE_METHOD,
            payload:method
        })
    }

    //method selected, form payment
    const nextStep= condition=>{
        dispatch({
            type:FORM_PAYMENT,
            payload:condition
        })
    }

    //payment
    const sendPayment= async datos=>{
        try {
            console.log(datos);
            // const response= await clientAxios.post('/payment_mercantil_tdc',datos);
            
            setTimeout(() => {
                dispatch({
                    type:PAYMENT,
                    payload:true
                })
            }, 2000);
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
    return (
        <payContext.Provider
            value={{
                loading:state.loading,
                years:state.years,
                months:state.months,
                coins:state.coins,
                method:state.method,
                methods:state.methods,
                payment:state.payment,
                selectedMethods:state.selectedMethods,
                selectedCoin:state.selectedCoin,
                processPayment:state.processPayment,
                setLoading,
                changeMethod,
                changeCoin,
                nextStep,
                sendPayment
            }}
           
        >
         
            {props.children}
        </payContext.Provider>
    )
}
export default PayState;