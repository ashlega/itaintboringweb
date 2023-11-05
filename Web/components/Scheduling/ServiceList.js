"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { getBookableServiceList, getSubscribedServices} from "../../utils/appointmentFunctions.js"
import ServiceCard from "./ServiceCard.js";

const ServiceList = () => {
  
  const { appState, setAppState } = useContext(AppContext);

  const [servicesList, setServiceList ] = useState({data : []})
  const [subscribedServicesList, setSubscribedServicesList ] = useState({data : []})

  useEffect(() => {
    const loadServices = async () => {
      var bookableServicesList = await getBookableServiceList();
      var subscribedservicesList = await getSubscribedServices();
      setServiceList(bookableServicesList);
      setSubscribedServicesList(subscribedservicesList);
    };

    loadServices();
  }, [])

  
  return (
    <>
      {servicesList.data.map((service) => {
        return (
          <>
             <ServiceCard title={service.serviceDisplayName}  description={service.serviceDescription} name={service.serviceName}/>
          </>
        )
      }
      )}
    </>
  );
};

export default ServiceList;