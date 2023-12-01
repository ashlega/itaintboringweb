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
import { getAvailableTimes, bookTimeById, getBookableServiceList, getSubscribedServices, cancelBookingById} from "../utils/appointmentFunctions.js"
import { displyErrorMessage, confirmActionPopup, showProcessingOverlay } from "../utils/notificationFunctions.js"
import Contact from "../components/Actions/Contact.js"
import ServiceList from "../components/Scheduling/ServiceList.js"
import ServiceCard from "../components/Scheduling/ServiceCard.js";
import BookedServicesList from "../components/Scheduling/BookedServicesList.js";
import  ButtonOnPage  from "../components/misc/ButtonOnPage"
import  SiteSettings  from "../utils/SiteSettings.js"
import Link from "next/link";
import { useRouter } from 'next/router';



import ClientRequests from "../components/Requests/ClientRequests";

export default function BookingList() {

  const router = useRouter();

  const { data : session, status: loading } = useSession()

  const { appState, setAppState } = useContext(AppContext);

  const [appointmentType, setAppointmentType] = useState(null);
  const [appointmentLocation, setAppointmentLocation] = useState(null);
  const [serviceDisplayName, setServiceDisplayName] = useState(null);
  const [serviceDescription, setServiceDescription] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const cancelBooking = async (selectedOption) => {
    setSelectedOption(selectedOption);
    confirmActionPopup(appState, setAppState, "bookingcancellation", "Please confirm", "Are you sure you want to cancel this booking?");
  }

  useEffect(() => {
    if(appState.confirmationRequest.result == "CONFIRM" &&
       appState.confirmationRequest.source == "bookingcancellation")
       {
          const internalCancelBooking = async () => {
            showProcessingOverlay(appState, setAppState, true, "Processing, please wait...");
            var response = null;
            try{
              response = await cancelBookingById(selectedOption);
            }
            finally{
              showProcessingOverlay(appState, setAppState, false, "");
            }
            if(response.result != "OK"){
              displyErrorMessage(appState, setAppState, SiteSettings.ErrorMessageTitle, response.error);
            }
            else{
              //displyErrorMessage(appState, setAppState, SiteSettings.ConfirmationMessageTitle, SiteSettings.BookingCancelled);
              router.reload();
            }
          }
          internalCancelBooking();
       }
  }, [appState.confirmationRequest.result])

  

  return (
   <>
    <SeoHead title='Bookings' />
    <Layout>
      <>
      <div
      className="max-w-screen-xl mt-32 px-8 xl:px-16 mx-auto"
      id="bookingList"
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
            <div className="flex w-full justify-center font-bold text-2xl mb-4">{SiteSettings.bookedServicesAndEventsHeader}</div>
               <div className="flex w-full justify-center mb-4">
                
               <Link
                    href="booking"
                    className="text-black-600 hover:underline flex w-full justify-center mb-4 "
                  >
                    <>
                      <div className="grid grid-flow-col">
                       
                       <div className="flex">{SiteSettings.servicesAndEventsHeader}</div>
                       <div><img className="flex align-top"  alt={SiteSettings.servicesAndEventsHeader} width="28" src="/assets/Icon/gridicons-arrow-right.svg" /></div>
                     </div>
                     </>
                  </Link>   

                 
              </div>

              
            <BookedServicesList onCancelBooking={cancelBooking}/>
             
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
