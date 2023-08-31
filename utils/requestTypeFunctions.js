import React, { useMemo, useState, useEffect } from "react";

const getRequestTypeApi = `/api/requesttype`
var requestTypes = null

fetch(getRequestTypeApi).then((response) => {
    
    response.json().then((data) => {
         requestTypes = data.data;
    })
});

export var requestTypes;

export function getRequestTypes() {
    
    return requestTypes;
}

/*
export function getRequestTypes() {
    
    //const response = await fetch(getRequestTypeApi)
    //const data = await response.json()
    const [requestTypesData, setRequestTypesData] = useState();

    useEffect(() => {
        
      }, []);

	return requestTypesData;
}
*/

