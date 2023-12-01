import React, { useContext } from 'react';


export function displyErrorMessage(appState, setAppState, errTitle = "Error", errMessage){
    setAppState({...appState, error: {
        visible: false
    }});
    setTimeout(() => 
        setAppState({...appState, error: {
            visible: true,
            title: errTitle,
            message: errMessage
        }}), 100);
}

export function confirmActionPopup(appState, setAppState, source = null, title = "PLease confirm", message = ""){
    setAppState({...appState, confirmationRequest: {
        visible: false
    }});
    setTimeout(() => 
        setAppState({...appState, confirmationRequest: {
            visible: true,
            title: title,
            message: message,
            result: null,
            source: source
        }}), 100);
}


export function showProcessingOverlay(appState, setAppState, visible, title){
    setAppState({...appState, processingOverlay: {
        visible: visible,
        title: title
    }});
}


