
import React,{useEffect,useContext} from 'react';
import PayContext from '../context/Pay/payContext';
import M from "materialize-css";
import Method from './Method';
import Tdc from './Tdc';
import Summary from './Summary';

const Form = () => {

    const payContext=useContext(PayContext);


    const {payment,processPayment}=payContext;
    
    useEffect(()=>{
        M.AutoInit();
       
        if(processPayment){
            console.log(processPayment)
            var targetWindow = window.opener

            console.log(targetWindow)
            targetWindow.postMessage({payment:true},'*')
            window.close()
        }
    },[processPayment])

    const FormMethod=()=>{
        if(!payment) return <Method /> ;
        return <Tdc />    
    }

    
    
    return ( 
        <div className="row">
            <div 
                className="col s12 m12 l8 offset-l2 z-depth-2 card-panel"
            >
                <div className="payment">
                    <Summary/>
                    <FormMethod/>
                </div>
            </div>
        </div>
     );
}



export default Form;