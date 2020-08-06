import {PAGAR_MERCANTIL,SET_LOADING} from '../../types'
    
export default (state,action) =>{
    switch (action.type) {
        case PAGAR_MERCANTIL:
            return{
                ...state,
                payment:true,
                loading:false,
                response:action.payload
            }
        default:
            return state;
    }
}