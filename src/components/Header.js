import React from 'react';
import PropTypes from 'prop-types';

const Header = ({title}) => {
    return (  
        <nav>
            <div  className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo center"><img src="https://www.ubiipagos.com/img/logo.png" alt="logo"/></a>
            </div>
        </nav>
    );
}

Header.propType={
    title:PropTypes.string.isRequired,
}
export default Header;