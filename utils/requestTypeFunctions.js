import React, { useMemo, useState, useEffect } from "react";

var requestTypes = null

const getRequestTypeApi = `/api/requesttype`


export async function getRequestTypes() {
    if(requestTypes) return requestTypes;
    var fetchResult = await fetch(getRequestTypeApi);
    var response = await fetchResult.json();
    requestTypes = response.data;
    return requestTypes;
}

