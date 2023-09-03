import React, { useMemo, useState, useEffect } from "react";

var requestTypes = null

const getRequestTypeApi = `/api/requesttype`


export async function internalGetRequestTypes() {
    if(requestTypes) return requestTypes;
    var fetchResult = await fetch(getRequestTypeApi);
    var response = await fetchResult.json();
    requestTypes = response.data;
    return requestTypes;
}
if(typeof(window) != 'undefined')
{
    internalGetRequestTypes().then(()=>
    {
        
    })
}

export function getRequestTypes() {
    return requestTypes;
}

