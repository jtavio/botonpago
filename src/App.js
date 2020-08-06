import React,{Fragment} from 'react';
import Form from './components/Form';
import 'materialize-css/dist/css/materialize.min.css';
import PayState from './context/Pay/payState';

function App() {
 
  return (
    <PayState>
        <Fragment>
          <div className="container">
            <Form/>
          </div>
        </Fragment>
    </PayState>
  );
}

export default App;
