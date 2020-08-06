import React from 'react';
import InputMask from "react-input-mask";

const MaskInput = (props) => {
    const {register,...object}=props
    
    return ( 
        <InputMask 
            {...object}  
            maskPlaceholder=""
            ref={register}
            id={object.name}
        />
     );
}
 
export default MaskInput;