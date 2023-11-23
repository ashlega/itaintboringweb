"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { getBookableServiceList} from "../../utils/appointmentFunctions.js"
import ServiceCard from "./ServiceCard.js";
import LoadingIndicator from "../misc/LoadingIndicator"

const ServiceList = ({onSelectService}) => {
  
  const { appState, setAppState } = useContext(AppContext);

  const [servicesList, setServiceList ] = useState({data : []})
  //const [subscribedServicesList, setSubscribedServicesList ] = useState({data : []})

  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoadingData(true)
      var bookableServicesList = await getBookableServiceList();
      //var subscribedservicesList = await getSubscribedServices();
      setIsLoadingData(false)
      setServiceList(bookableServicesList);
      //setSubscribedServicesList(subscribedservicesList);
    };

    loadServices();
  }, [])

  
  return (
    <>
      {isLoadingData ? (
                <LoadingIndicator isCentered={true} title="Loading data..."/>
            ):null}
      {servicesList.data.map((service) => {
        return (
             <ServiceCard onSelectService={onSelectService} title={service.serviceDisplayName} locationTitle={service.locationDisplayName} locationName={service.locationName} description={service.serviceDescription} name={service.serviceName}/>
        )
      }
      )}
    </>
  );
};

export default ServiceList;