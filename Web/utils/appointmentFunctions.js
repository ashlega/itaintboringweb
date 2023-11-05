import React, { useMemo, useState, useEffect } from "react";

const getAvailabilityApi = `/api/availability`
const bookAppointmentApi = `/api/booking`
const serviceListApi = `/api/service`
const subscribedServiceListApi = `/api/subscribedservice`

export async function getAvailableTimes(activeDate, appointmentType, appointmentLocation) {
    
    const response = await fetch(getAvailabilityApi,{
        method: 'POST',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: appointmentType,
            location: appointmentLocation,
            date: activeDate
        }),
    });
    const data = await response.json()
    if(data.result == "OK"){
        data.data.map((val) => {
            val.Date = new Date(val.Date)
        })
	    
    }
    return data;
}

export async function bookTimeById(timeSlotId, appointmentType, appointmentLocation){
    const response = await fetch(bookAppointmentApi,{
        method: 'POST',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: appointmentType,
            location: appointmentLocation,
            timeSlotId: timeSlotId
        }),
    });
    const data = await response.json()
    return data;
}

export async function getBookableServiceList() {
    
    const response = await fetch(serviceListApi,{
        method: 'GET',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    return data;
}

export async function getSubscribedServices() {
    
    const response = await fetch(subscribedServiceListApi,{
        method: 'GET',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    return data;
}


