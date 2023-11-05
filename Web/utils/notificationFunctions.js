import React, { useContext } from 'react';


export function displyErrorMessage(appState, setAppState, errTitle = "Error", errMessage){
    setAppState({...appState, error: {
        visible: true,
        title: errTitle,
        message: errMessage
    }});
}

