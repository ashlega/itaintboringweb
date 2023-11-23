"use client";

import React, { useMemo, useState, useEffect } from "react";

const getAvailabilityApi = `/api/availability`
const bookAppointmentApi = `/api/booking`
const serviceListApi = `/api/service`
const bookingListApi = `/api/bookinglist`

const padZeroLeft = function (nm) { 
    if(nm < 10) return "0"+nm;
    else return nm;
  };

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
            val.Date = new Date(val.dtStart);
            val.dtEnd = new Date(val.dtEnd);
            val.dtStart = new Date(val.dtStart);
            val.label =  padZeroLeft(val.dtStart.getHours()) + ":" + padZeroLeft(val.dtStart.getMinutes()) + " - " + padZeroLeft(val.dtEnd.getHours()) + ":" + padZeroLeft(val.dtEnd.getMinutes());
      
        })
	    
    }
    return data;
}

export async function cancelBookingById(bookingId){
    const response = await fetch(bookAppointmentApi,{
        method: 'DELETE',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookingId: bookingId
        }),
    });
    const data = await response.json()
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


export async function getBookings() {
    
    const response = await fetch(bookingListApi,{
        method: 'GET',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    var result = [];
    data.data.map((booking) => {
        booking.start = new Date(booking.start);
        booking.end = new Date(booking.end);
        result.push(booking);
    })
    return result;
}

export async function getBookingDetails(bookingId) {
    
    const response = await fetch(bookAppointmentApi + "?bookingid="+bookingId,{
        method: 'GET',
        cache: "no-store",
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const result = await response.json()
    if(result.result == "OK"){
        result.data.start = new Date(result.data.start);
        result.data.end = new Date(result.data.end);
    }
    

    return result;
}

/*
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

*/
