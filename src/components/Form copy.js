import React,{useState,useEffect,useContext} from 'react';
import CardInput from './partials/CardInput';
import 'materialize-css/dist/css/materialize.min.css'
import M from "materialize-css";
import { useForm } from "react-hook-form";
import MaskInput from './partials/MaskInput';
import MercantilContext from '../context/bancoMercantil/mercantilContext';
import PayContext from '../context/Pay/payContext';
import {uppercase,formatCard} from '../helpers/str';
import Spinner from './spinner/Spinner';

const Form = () => {
    //state
    const[data,setData]=useState({
        card:'',
        name:'',
        month:'',
        year:'',
        cvv:'',
        amount:'',
        order:'',
        dni:'',
        letter:''
    })

    //extract 
    const {card,name,month,year,cvv,amount,order,dni,letter}=data;
    
    //get data from MercantilContext
    const mercantilContext=useContext(MercantilContext);
    const {pagar,payment,loading,setLoading}=mercantilContext;
    
    const payContext=useContext(PayContext);
    const {coins,selectedMethods,changeCoin}=payContext;

    //validar form
    const { register, handleSubmit, errors } = useForm({
        reValidateMode:'onSubmit'
    });

    useEffect(()=>{
        M.AutoInit();
         // eslint-disable-next-line
    },[selectedMethods])

    
    //handle change
    const handleChange=e=>{
        if(e.target.name==="name"){
            e.target.value=uppercase(e.target.value)
        }
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeCoin=e=>{
        changeCoin(e.target.value);
    }

    //submit
    const onSubmit=data=>{
        const pay={
            typet:"0200",
            crdn:formatCard(data.card),
            ncrd:uppercase(data.name),
            ci:data.letter+data.dni,
            inv:data.order,
            fexp:data.month+data.year,
            cvv:data.cvv,
            lote:"100",
            m:data.amount
        }
        pagar(pay);
        setLoading(true)
    }
    
    return ( 
        <div className="row">
            {loading ? <Spinner/> :null}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col s12 m12 l8 offset-l2 z-depth-2 card-panel"
            >
                <div className="payment-header">
                    <div className="row">
                        <div className=" col s12">
                            <h5 className="title">RESUMEN</h5>
                        </div>
                        <div className=" col s12">
                            <p className="description">McDonalds - Combo McPollo</p>
                            <div className="content-price">
                                <span className="total left-align">TOTAL</span>
                                <span className="total right-align">$7,3</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment-body">
                    <div className="row">
                        <div className=" col s12">
                            <h5 >INFORMACIÓN DE PAGO</h5>
                        </div>
                        <div className="input-field col s12 l12">
                            <h6 >Selecciona un método de pago</h6>
                        </div>
                        <div className="input-field col s12 l6">
                            <select
                                name="coin"
                                id="coin"
                                onChange={e=>{handleChange(e); handleChangeCoin(e);}}
                                ref={register({
                                    required:{value:true,message:'Selecciona una moneda'}
                                })}
                            >
                                <option value="">Selecciona</option>
                                {coins && coins.map(coin=>(
                                    <option value={coin.value} key={coin.value}>{coin.description}</option>
                                ))}
                            </select>
                            <label htmlFor="month">Moneda: </label>
                            <span className="helper-text invalid" data-error="wrong" >
                                {errors.coin && errors.coin.message}
                            </span>
                        </div>
                        <div className="input-field col s12 l6">
                            <select
                                name="method"
                                id="method"
                                onChange={handleChange}
                                ref={register({
                                    required:{value:true,message:'Selecciona un método de pago'}
                                })}
                            >
                                <option value="" >Selecciona</option>
                                {selectedMethods && selectedMethods.map(method=>(
                                    <option value={method.value} data-icon={method.icon} key={method.value}>{method.description}</option>
                                ))}
                            </select>
                            <label htmlFor="method">Método de pago: </label>
                            <span className="helper-text invalid" data-error="wrong" >
                                {errors.method && errors.method.message}
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <button
                                className="waves-effect waves-light btn-large btn-block w-100 btn-u-blue accent-4"
                            >
                                Pagar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     );
}



export default Form;