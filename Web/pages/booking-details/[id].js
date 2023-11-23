//import Layout from "../components/layout"
import Feature from "../../components/Feature";
import About from "../../components/About";
import Pricing from "../../components/Pricing";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout/Layout";
import SeoHead from "../../components/SeoHead";
import React, { useContext, useEffect, useState } from 'react';
import AppContext from "../../components/Context/AppContext";
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import AppointmentScheduler from "../../components/Scheduling/AppointmentScheduler.js"
import { getBookingDetails, cancelBookingById } from "../../utils/appointmentFunctions.js"
import { displyErrorMessage, confirmActionPopup, showProcessingOverlay } from "../../utils/notificationFunctions.js"
import Contact from "../../components/Actions/Contact.js"
import ServiceList from "../../components/Scheduling/ServiceList.js"
import ServiceCard from "../../components/Scheduling/ServiceCard.js";
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"
import  SiteSettings  from "../../utils/SiteSettings.js"
import { useRouter } from 'next/router';
import Link from "next/link";

export default function BookingPage() {

  const router = useRouter();

  const [bookingDetails, setBookingDetails] = useState({})
  const [isLoadingData, setIsLoadingData] = useState(true)

  const { data : session, status: loading } = useSession()

  const { appState, setAppState } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const loadBookingDetails = async () => {
      setIsLoadingData(true)
      var data = await getBookingDetails(router.query.id);
      if(data.result != "OK"){
        displyErrorMessage(appState, setAppState, "Error", data.error);
        return {};
      }
      setBookingDetails(data.data)
      setIsLoadingData(false)
    };
    if(loading != "loading" && session) loadBookingDetails();
  }, [loading])


  const cancelBooking = async (selectedOption) => {
    setSelectedOption(selectedOption);
    confirmActionPopup(appState, setAppState, "bookingdetailsancellation", "Please confirm", "Are you sure you want to cancel this booking?");
  }

  useEffect(() => {
    if(appState.confirmationRequest.result == "CONFIRM" &&
       appState.confirmationRequest.source == "bookingdetailsancellation")
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
              router.push("/bookingList");
            }
          }
          internalCancelBooking();
       }
  }, [appState.confirmationRequest.result])


  return (
   <>
    <SeoHead title='Booking details' />
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
          
            <div className="flex w-full justify-center font-bold text-2xl mb-4">{SiteSettings.bookingDetailsHeader}
               
            </div>
            
            <ServiceCard onSelectService={cancelBooking}
                  title={bookingDetails.serviceDisplayName} 
                  start={bookingDetails.start}
                  end={bookingDetails.end}
                  locationTitle={bookingDetails.locationDisplayName} 
                  locationName={bookingDetails.locationDisplayName} 
                  description={bookingDetails.serviceDescription}
                  name={bookingDetails.id}
                  extraDetails={bookingDetails.extraDetails}
                  buttonTitle="Cancel" />
           
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
