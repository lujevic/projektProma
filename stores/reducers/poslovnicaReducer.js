
import POSLOVNICE_TEST from '../../models/PoslovniceData.js'
import { POSLOVNICA_ACTION } from '../actions/poslovnicaAction';

const INCREMENT = 1;

const initState = {
    poslovnice: POSLOVNICE_TEST,
    next_id: POSLOVNICE_TEST.length
}

const poslovnicaReducer = (state = initState, action) => {

    switch(action.type) {
        case POSLOVNICA_ACTION.ADD_POSLOVNICA:
            return { poslovnice: [...state.poslovnice, action.payload], next_id: state.next_id + INCREMENT}
        case POSLOVNICA_ACTION.ADD_ARTIKAL:
            const p = state.poslovnice.map(x=> { 
                if (x.id != action.payload.id) {
                    return x;
                }
                 x.artikli = [...x.artikli, action.payload.artikal]
                return  x
            })
            return {...state, poslovnice : p}
        case POSLOVNICA_ACTION.UPDATE_POSLOVNICA:
            return {...state, poslovnice: state.poslovnice.map(x=> x.id == action.payload.id ? action.payload : x)}
  
        case POSLOVNICA_ACTION.TRANSFER_ARTIKAL:
                return {...state, poslovnice: state.poslovnice.map(x=> {
                    if (x.id == action.payload.first.id) return action.payload.first
                    return  x.id == action.payload.second.id ? action.payload.second : x
                })}
    
        case POSLOVNICA_ACTION.BANKRUPTCY_POSLOVNICA:
            return {...state, poslovnice: state.poslovnice.filter(x=> x.id != action.payload)}
        default:
            return state;

    }
}
export default poslovnicaReducer;
