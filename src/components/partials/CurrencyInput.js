import React from 'react';
import CurrencyFormat from 'react-currency-format';

const CurrencyInput = () => {
    return ( 
        <CurrencyFormat value={4111111111111111} displayType={'text'} format="#### #### #### ####" />
 
    );
}
 
export default CurrencyInput;