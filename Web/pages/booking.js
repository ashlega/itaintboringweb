//import Layout from "../components/layout"
import Feature from "../components/Feature";
import About from "../components/About";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import React, { useContext, useEffect, useState } from 'react';
import AppContext from "../components/Context/AppContext";
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import AppointmentScheduler from "../components/Scheduling/AppointmentScheduler.js"
import { getAvailableTimes, bookTimeById, getBookableServiceList, getSubscribedServices} from "../utils/appointmentFunctions.js"
import { displyErrorMessage, showProcessingOverlay } from "../utils/notificationFunctions.js"
import Contact from "../components/Actions/Contact.js"
import ServiceList from "../components/Scheduling/ServiceList.js"
import ServiceCard from "../components/Scheduling/ServiceCard.js";
import BookedServicesList from "../components/Scheduling/BookedServicesList.js";
import  ButtonOnPage  from "../components/misc/ButtonOnPage"
import  SiteSettings  from "../utils/SiteSettings.js"
import { useRouter } from 'next/router';



import ClientRequests from "../components/Requests/ClientRequests";
import Link from "next/link";
import { Router } from "next/router";

export default function BookingPage() {

  const router = useRouter();

  const { data : session, status: loading } = useSession()

  const { appState, setAppState } = useContext(AppContext);

  const [appointmentType, setAppointmentType] = useState(null);
  const [appointmentLocation, setAppointmentLocation] = useState(null);
  const [serviceDisplayName, setServiceDisplayName] = useState(null);
  const [serviceDescription, setServiceDescription] = useState(null);

  


  const getTimes = async (activeDate) => {
    var options = await getAvailableTimes(activeDate, appointmentType, appointmentLocation);
    if(options.result != "OK"){
      displyErrorMessage(appState, setAppState, "Error", options.error);
      return [];
    }
    return options.data;
  }

  const bookTime = async (selectedOption) => {
    var response = null;
    showProcessingOverlay(appState, setAppState, true, "Processing, please wait...");
    try{
      response = await bookTimeById(selectedOption, appointmentType, appointmentLocation);
    }
    finally{
      showProcessingOverlay(appState, setAppState, false, "");
    }
    if(response.result != "OK"){
      displyErrorMessage(appState, setAppState, "Error", response.error);
    }
    else{
      router.push("/bookingList");
      displyErrorMessage(appState, setAppState, SiteSettings.ConfirmationMessageTitle, SiteSettings.BookingConfirmed);
    }
  }

  const selectService = (serviceName, locationName, serviceDisplayName, serviceDescription="") => {
    setAppointmentType(serviceName);
    setAppointmentLocation(locationName);
    setServiceDisplayName(serviceDisplayName);
    setServiceDescription(serviceDescription);
  }

  return (
   <>
    <SeoHead title='Booking' />
    <Layout>
      <>
      <div
      className="max-w-screen-xl mt-32 px-8 xl:px-16 mx-auto"
      id="booking"
      >
       {loading != "loading" ? (
        <>
        {!session ? (
          <>
          <AccessDenied />
          </>
        ) : 
        ( 
          <>
            <div className="mt-28 ml-2 sm:ml-12 mb-24 px-6 sm:px-8 lg:px-28">
            
              {appointmentType != null && appointmentLocation != null ? (
                <>
                <div className="relative z-29 mb-2">
                <ServiceCard 
                   onSelectService={() => selectService(null, null)} 
                   title={serviceDisplayName} 
                   locationTitle={null} 
                   locationName={""} 
                   description={serviceDescription} 
                   name={""}
                   buttonTitle="Back"/>
                  </div>

                    
                    
                    <AppointmentScheduler prefix="general" onGetAvailableTimes={getTimes} onBookTime={bookTime}
                      initialDate={new Date()}
                    />
                  
                </>
              ) : 
              <>
              <div className="flex w-full justify-center font-bold text-2xl mb-4">{SiteSettings.servicesAndEventsHeader}</div>
              
               
                  <Link
                    href="bookingList"
                    className="text-black-600 hover:underline flex w-full justify-center mb-4 "
                  >
                    <>
                      <div className="grid grid-flow-col">
                       
                       <div className="flex">{SiteSettings.bookedServicesAndEventsHeader}</div>
                       <div><img className="flex align-top"  alt={SiteSettings.bookedServicesAndEventsHeader} width="28" src="/assets/Icon/gridicons-arrow-right.svg" /></div>
                     </div>
                     </>
                  </Link>   
                
              
              <ServiceList onSelectService={selectService}  />
              </>
               }
          </div>
         </>
        )
        }
        </>
       ) : null }
       <div className="relative pb-24">
        <Contact isOpenInitially={false}/>
      </div>
      </div>
      </>
    </Layout>
  </>
  )
}
