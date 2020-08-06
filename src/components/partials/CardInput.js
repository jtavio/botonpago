import React from 'react';
import InputMask from "react-input-mask";

const CardInput = ({register}) => {
    const propsInput={
        id:"card", 
        type:"text", 
        name:"card", 
        className:"validate",
        mask:"9999-9999-9999-9999",
        maskPlaceholder:""
    };

    //Funcion change
    const onChange=(e)=>{
        let value=e.target.value;

    }

    //validar número de tarjeta
    //card valite 
    const validateCard=(value)=>{
        // accept only digits, dashes or spaces
        value = value.replace(/\D/g, "");
        if (/[^0-9-\s]+/.test(value)) return false;
        return ((/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value)) || (/^(?:5[1-5][0-9]{14})$/.test(value)) || (/^(?:2223[0-9]{12})$/.test(value)));
       
    }   
    return ( 
        <InputMask 
            {...propsInput}  
            onChange={onChange} 
            ref={register({
                validate: async value=> await validateCard(value) || 'Número de tarjeta no válido',  
                required:{value:true,message:'Número de tarjeta es obligatorio'},
                  
            })}
        />
     );
}
 
export default CardInput;