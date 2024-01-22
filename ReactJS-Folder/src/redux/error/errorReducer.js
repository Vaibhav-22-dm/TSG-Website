import {SET_ERROR,CLEAR_ERROR} from './errorType'

const initState = {
    error: null
   };
   
  function errorReducer(state = initState, action){
         switch(action.type){
              case SET_ERROR:
                return {
                     ...state,
                     error: action.error
                }
              case CLEAR_ERROR:
                return {
                      ...state, 
                      error: null
                }
              default:
                return state;
         }
   }

 export default errorReducer;