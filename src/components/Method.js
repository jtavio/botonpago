import React,{useEffect,useContext} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from "materialize-css";
import { useForm } from "react-hook-form";
import PayContext from '../context/Pay/payContext';
import {uppercase} from '../helpers/str';



const Method = () => {

    const payContext=useContext(PayContext);
    const {coins,selectedMethods,selectedCoin,method,changeCoin,changeMethod,nextStep}=payContext;
    
    //validar form
    const { register, handleSubmit, errors } = useForm({
        reValidateMode:'onSubmit'
    });

    useEffect(()=>{
        M.AutoInit();
    },[selectedMethods])
    
    //handle change
    const handleChange=e=>{
        if(e.target.name==="name"){
            e.target.value=uppercase(e.target.value)
        }
    }

    const handleChangeCoin=e=>{
        changeCoin(e.target.value);
    }

    
    const handleChangeMethod=e=>{
        changeMethod(e.target.value)    
    }

    //submit
    const onSubmit=data=>{
        if(method && selectedCoin){
            nextStep(true)
        }
    }

    return ( 
        <form 
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    value={selectedCoin}
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
                    value={method}
                    onChange={handleChangeMethod}
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
        </form>
     );
}
 
export default Method;