import React,{useState,useEffect,useContext} from 'react';
import CardInput from './partials/CardInput';
import 'materialize-css/dist/css/materialize.min.css'
import M from "materialize-css";
import { useForm } from "react-hook-form";
import MaskInput from './partials/MaskInput';
import PayContext from '../context/Pay/payContext';
import {uppercase,formatCard} from '../helpers/str';
import Spinner from './spinner/Spinner';




const Tdc = () => {

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


    const payContext=useContext(PayContext);
    const {years,months,loading,sendPayment,setLoading}=payContext;

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

    //validar form
    const { register, handleSubmit, errors } = useForm({
        reValidateMode:'onSubmit'
    });

    useEffect(()=>{
        M.AutoInit();
    },[])
    
    //submit
    const onSubmit=data=>{
        console.log(data)
        setLoading(true)
        const pay={
            typet:"0200",
            crdn:formatCard(data.card),
            ncrd:uppercase(data.name),
            ci:data.letter+data.dni,
            inv:data.order,
            fexp:data.month+data.year,
            cvv:data.cvv,
            lote:"100",
            m:'10000'
        }
        sendPayment(pay);
    }

    return (  
        <form 
            onSubmit={handleSubmit(onSubmit)}
        >
            {loading ? <Spinner/> :null}
            <div className="row">
                <div className="input-field col s4 l4">
                    <select
                        name="letter"
                        id="letter"
                        onChange={handleChange}
                        ref={register({
                            required:{value:true,message:'Nacionalidad obligatorio'}
                        })}
                    >
                        <option value="V">V</option>
                        <option value="E">E</option>
                        
                    </select>
                    <label htmlFor="letter">Nacionalidad: </label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors.letter && errors.letter.message}
                    </span>
                </div>
                <div className="input-field col s8">
                    <MaskInput  
                        type="text" 
                        name="dni" 
                        id="dni"
                        mask="99999999" 
                        onChange={handleChange}
                        register={register({
                            required:{value:true,message:'Número de cédula es obligatorio'},
                            maxLength:{value:8,message:"este campo debe tener máximo 8 caracteres"},
                        })}
                    />
                    <label htmlFor="dni">Cédula</label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors?.dni?.message}
                    </span>
                </div>
                <div className="input-field col s12">
                    <MaskInput  
                        type="text" 
                        name="name" 
                        id="name" 
                        mask=''
                        onChange={handleChange}
                        maxLength="40"
                        register={register({
                            required:{value:true,message:'Nombre de tarjeta habiente es obligatorio'},
                            maxLength:{value:40,message:"este campo debe tener máximo 40 caracteres"},
                            
                        })}
                    />
                    <label htmlFor="name">Nombre tarjeta habiente</label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors?.name?.message}
                    </span>
                </div>

                <div className="input-field col s12">
                    <CardInput 
                        register={register}
                        onChange={handleChange}
                    />
                    <label htmlFor="card">Número de tarjeta</label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors?.card?.message}
                        {/* {errors?.card?.type==='validate' ? 'Por favor ingrese un número de tarjeta valido' : ''} */}
                    </span>
                </div>
                <div className="input-field col s6 l4">
                    <select
                        name="month"
                        id="month"
                        onChange={handleChange}
                        ref={register({
                            required:{value:true,message:'El mes obligatorio'}
                        })}
                    >
                        <option value="">-- Mes--</option>
                        {months && months.map(month=>(
                            <option value={month.value} key={month.value}>{month.description}</option>
                        ))}
                    </select>
                    <label htmlFor="month">Mes: </label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors.month && errors.month.message}
                    </span>
                </div>
                <div className="input-field col s6 l4">
                    <select
                        name="year"
                        id="year"
                        onChange={handleChange}
                        ref={register({
                            required:{value:true,message:'El año obligatorio'}
                        })}
                    >
                        <option value="">-- Año--</option>
                        {years}
                    </select>
                    <label htmlFor="month">Año: </label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors.year && errors.year.message}
                    </span>
                </div>
                <div className="input-field col s12 l4">
                    <MaskInput 
                        type="text" 
                        name="cvv" 
                        onChange={handleChange}
                        mask="999"
                        register={register({
                            required:{value:true,message:'El cvv es obligatorio'},
                            maxLength:{value:3,message:"El cvv debe tener máximo 3 dígitos"},
                            minLength:{value:3,message:"El cvv debe tener minimo 3 dígitos"}
                        })}
                    />
                    <label htmlFor="cvv">CVV</label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors.cvv && errors.cvv.message}
                    </span>
                </div>
                <div className="input-field col s12">
                    <MaskInput 
                        type="text" 
                        mask='999999999999999999999'
                        name="order" 
                        onChange={handleChange}
                        register={register({
                            required:{value:true,message:'El monto es obligatorio'}
                        })}
                    />
                    <label htmlFor="order">Número de orden</label>
                    <span className="helper-text invalid" data-error="wrong" >
                        {errors.order && errors.order.message}
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
 
export default Tdc;