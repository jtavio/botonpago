import {SET_LOADING,CHANGE_COIN,CHANGE_METHOD,FORM_PAYMENT,PAYMENT} from '../../types'
    
export default (state,action) =>{
    switch (action.type) {
        case SET_LOADING:
            return{
                ...state,
                loading:action.payload,
            }
        case CHANGE_COIN:
            return{
                ...state,
                selectedCoin:action.payload,
                selectedMethods:state.methods.filter(method=>method.coin===action.payload),
                method:''
            }
        case CHANGE_METHOD:
            return{
                ...state,
                method:action.payload
            }
        case FORM_PAYMENT:
            return{
                ...state,
                payment:action.payload
            }
        case PAYMENT:
            return{
                ...state,
                loading:false,
                processPayment:true,
            }
        default:
            return state;
    }
}