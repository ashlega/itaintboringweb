import React, { useMemo, useState, useEffect } from "react";

const getAvailabilityApi = `/api/availability`
const bookAppointmentApi = `/api/booking`

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
	    return data.data;
    }
    else throw new Error(data.error != null ? data.error : "An error has occurred while retriving availability data. Please try again later.")
}

