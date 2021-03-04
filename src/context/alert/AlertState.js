import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    REMOVE_ALERT, 
    SET_ALERT
} from '../types';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Show Alert
    const showAlert = (alert) => {
        dispatch({type: SET_ALERT, payload: alert});
        
        setTimeout(() => dispatch({type: REMOVE_ALERT}),3000);
      }

    return <AlertContext.Provider value={{
        alert: state.alert, 
        showAlert
    }}>
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;