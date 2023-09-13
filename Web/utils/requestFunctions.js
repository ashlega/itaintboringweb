import React, { useMemo, useState, useEffect } from "react";

const addRequestApi = `/api/request`
const getRequestListApi = `/api/requestlist`

export async function addNewRequest(subject, type, details, name, email) {
    const response = await fetch(addRequestApi,{
        method: 'POST',
        cache: 'no-store',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            details: details,
            subject: subject,
            type: type,
            userid: null,
            name: name,
            email: email
        }),
    });
    const data = await response.json()
	return data;
}

export async function getRequestList(activeOnly = false) {
    const response = await fetch(getRequestListApi+"?active_only="+activeOnly, {cache: 'no-store'});
    const data = await response.json()
	return data;
}




