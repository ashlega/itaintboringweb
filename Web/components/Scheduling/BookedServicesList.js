"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { getBookings} from "../../utils/appointmentFunctions.js"
import ServiceCard from "./ServiceCard.js";
import LoadingIndicator from "../misc/LoadingIndicator"
import  SiteSettings  from "../../utils/SiteSettings.js"

const BookedServicesList = ({onCancelBooking}) => {
  
  const { appState, setAppState } = useContext(AppContext);

  const [bookingList, setBookingList ] = useState([])
  //const [subscribedServicesList, setSubscribedServicesList ] = useState({data : []})

  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoadingData(true)
      
      var bookingList = await getBookings();
      setIsLoadingData(false)
      setBookingList(bookingList);
    };

    loadBookings();
  }, [])

  
  return (
    <>
      {isLoadingData ? (
                <LoadingIndicator isCentered={true} title="Loading data..."/>
            ):
            <>
              {bookingList.length == 0 ? (
                <>
                  <div className="flex w-full justify-center text-lg mt-6">{SiteSettings.NoBookingsMessage}</div>
                </>
              ) : null }
            </>
        }
      
          {bookingList.map((booking) => {
            return (
                <ServiceCard onSelectService={onCancelBooking}
                  title={booking.serviceDisplayName} 
                  start={booking.start}
                  end={booking.end}
                  locationTitle={booking.locationDisplayName} 
                  locationName={booking.locationDisplayName} 
                  description={booking.serviceDescription}
                  name={booking.id}
                  extraDetails={booking.extraDetails}
                  buttonTitle="Cancel" />
                
            )
          }
          )}
    </>
  );
};

export default BookedServicesList;