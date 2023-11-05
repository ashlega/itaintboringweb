//import Layout from "../components/layout"
import Feature from "../components/Feature";
import About from "../components/About";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import React, { useContext, useEffect } from 'react';
import AppContext from "../components/Context/AppContext";
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import AppointmentScheduler from "../components/Scheduling/AppointmentScheduler.js"
import { getAvailableTimes, bookTimeById, getBookableServiceList, getSubscribedServices} from "../utils/appointmentFunctions.js"
import { displyErrorMessage } from "../utils/notificationFunctions.js"
import Contact from "../components/Actions/Contact.js"
import ServiceList from "../components/Scheduling/ServiceList.js"


import ClientRequests from "../components/Requests/ClientRequests";

export default function BookingPage() {

  const { data : session, status: loading } = useSession()

  const { appState, setAppState } = useContext(AppContext);


  const getTimes = async (activeDate) => {
    var options = await getAvailableTimes(activeDate, "freeconsultation", "online");
    if(options.result != "OK"){
      displyErrorMessage(appState, setAppState, "Error", options.error);
      return [];
    }
    return options.data;
  }

  const bookTime = async (selectedOption) => {
    var response = await bookTimeById(selectedOption, "freeconsultation", "online");
    if(response.result != "OK"){
      displyErrorMessage(appState, setAppState, "Error", response.error);
    }
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

          <div className="mt-28 ml-2 sm:ml-12 mb-24 px-6 sm:px-8 lg:px-28">
            <ServiceList/>
          <AppointmentScheduler prefix="general" onGetAvailableTimes={getTimes} onBookTime={bookTime}
              initialDate={new Date()}
            />
         </div>
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
