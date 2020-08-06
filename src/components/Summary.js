import React from 'react';


const  Summary= () => {
    return ( 
        <div className="row summary">
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
     );
}
 
export default Summary;