"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import  ButtonOnPage  from "../misc/ButtonOnPage"
import SiteSettings from "../../utils/SiteSettings";

const ServiceCard = ({onSelectService, title, description, name, locationTitle, locationName, 
    buttonTitle = "Book", image = null, subscriptionRequired = false, start=null, end=null, extraDetails=null}) => {
  
  const { appState, setAppState } = useContext(AppContext);

  const bookService = (e, serviceName, locationName, serviceDisplayName, serviceDescription) => {
    if(onSelectService) onSelectService(serviceName, locationName, serviceDisplayName, serviceDescription)
  }

  
  return (
    <>
      <div
        class="mb-2 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        {image ? (
          <>
            <a href="#!">
              <img
                class="rounded-t-lg"
                src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                alt="" />
            </a>
          </>
        ) : null }
        <div class="p-6">
          <h5
            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {locationTitle != null ? (locationTitle + ": ") : ""}{title}
          </h5>
          {start || end ? (
            <>
            <p class="text-sm  mb-3 text-base text-neutral-600 dark:text-neutral-200">
             {start ? (
              <>
                
                <span className="font-semibold">From:</span> {start.toLocaleString()}&nbsp;&nbsp;
                
              </>
              ) : null}
             {end ? (
              <>
                
                <span className="font-semibold">To:</span> {end.toLocaleString()} 
                
              </>

              ) : null}
            </p>
            </>
          ) : null }
          <p class="mb-6 text-base text-neutral-600 dark:text-neutral-200">
            {description}
            
          </p>
          
          {extraDetails ? (
              
              <p class="mt-4 mb-4 text-base text-neutral-600 dark:text-neutral-200">
                <div className="font-lg font-semibold mb-2">{SiteSettings.BookingAdditionalDetailsHeader}</div>
                <div dangerouslySetInnerHTML={{__html: extraDetails}}></div>
              </p>
            ) : null }

          <ButtonOnPage
            onClick={(e)=>bookService(e, name, locationName, (locationTitle != null ? (locationTitle + ": ") : "") + title, description)}
          >
            {buttonTitle}
          </ButtonOnPage>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;