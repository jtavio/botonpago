import React from 'react';

const Menu = ({setMethod}) => {

    const handleClick=(method)=>{
        setMethod(method)
    }

    return ( 
        <div className="row">
            <h5 className="center-align">Seleccione el método de pago de tu preferencia</h5>
        
            <div className="col s12 m6 l3">
                <a className="waves-effect card-panel z-depth-2" onClick={()=>{handleClick(1)}} href="#!">
                    <img className="responsive-img" src="https://seeklogo.net/wp-content/uploads/2016/09/paypal-logo-preview.png" alt="img"></img>
                </a>
            </div>
            <div className="col s12 m6 l3">
                <a className="waves-effect card-panel z-depth-2" onClick={()=>{handleClick(2)}} href="#!">
                    <img className="responsive-img" src="https://seeklogo.net/wp-content/uploads/2016/09/paypal-logo-preview.png" alt="img"></img>
                </a>
            </div>
            <div className="col s12 m6 l3">
                <a className="waves-effect card-panel z-depth-2" onClick={()=>{handleClick(3)}} href="#!">
                    <img className="responsive-img" src="https://seeklogo.net/wp-content/uploads/2016/09/paypal-logo-preview.png" alt="img"></img>
                </a>
            </div>
            <div className="col s12 m6 l3">
                <a className="waves-effect card-panel z-depth-2" onClick={()=>{handleClick(4)}} href="#!">
                    <img className="responsive-img" src="https://seeklogo.net/wp-content/uploads/2016/09/paypal-logo-preview.png" alt="img"></img>
                </a>
            </div>
        </div>
        );
}
 
export default Menu;