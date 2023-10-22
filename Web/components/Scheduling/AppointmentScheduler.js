"use client";
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import { useSession } from "next-auth/react"
import "react-toggle/style.css"
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";




const AppointmentScheduler = ({
   prefix, 
   onGetAvailableTimes, 
   onBookTime = null,
   initialDate,
   noAvailabilityMessage = "There is no availability for this date, please <br/>pick one of the higlighted dates from the calendar."
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [timeOptions, setTimeOptions] = useState([]);

  const [isProcessingData, setIsProcessingData] = useState(false);
  const [timesLoaded, setTimesLoaded] = useState(true);

  
  var monthTimeOptions = [];

  const getMonthId = (activeDate) => {
    return activeDate.getMonth().toString() + "_" + activeDate.getYear().toString();
  }

  const activeDateWatch = async (picker, prevActiveDate, prevActiveMonth) => {
    if(picker._activeDate != prevActiveDate){
      setTimesLoaded(false);
      if(prevActiveMonth != getMonthId(picker._activeDate)){
        monthTimeOptions = await onGetAvailableTimes(picker._activeDate);
      }
      setSelectedDate(picker._activeDate)
      setTimeOptions(monthTimeOptions == null ? [] : monthTimeOptions.filter((val) => val.Date.getYear() == picker._activeDate.getYear() 
                                           && val.Date.getMonth() == picker._activeDate.getMonth() 
                                          && val.Date.getDate() == picker._activeDate.getDate() ));
      picker._changeView(picker._view);
      setTimesLoaded(true);

    }
    var prevDate = picker._activeDate;
    var prevMonth = getMonthId(picker._activeDate);
    setTimeout(() => activeDateWatch(picker, prevDate, prevMonth), 300);
  }

  useEffect(() => {

    
      
    

    const init = async () => {
      
      monthTimeOptions = await onGetAvailableTimes(initialDate);

      const { Datepicker, Input, initTE } = await import("tw-elements");
      initTE({ Datepicker, Input });
      
      var htmlElement = document.getElementById(`${prefix}_appointment_scheduler`);
      var containerHtmlElement = document.getElementById(`${prefix}_appointment_scheduler_container`);
      var appointmentDateInput = document.getElementById(`${prefix}_appointmentDateInput`);
      //const myInput = new Input(htmlElement);

      //var minDate = 
      /*internalTimeOptions && internalTimeOptions.length > 1 ?internalTimeOptions.reduce((prev, curr) => {
        return prev.Date < curr.Date ? prev : curr
      }, internalTimeOptions[0]).Date : new Date();*/
/*
      var maxDate = internalTimeOptions && internalTimeOptions.length > 1 ?internalTimeOptions.reduce((prev, curr) => {
        return prev.Date > curr.Date ? prev : curr
      }, internalTimeOptions[0]).Date : new Date();
*/
      const options = {
        //min: minDate,
        //max: maxDate,
        //removeClearBtn: true,
        disableInput: false,
        disableToggleButton: false,
        selected: new Date(),
        inline:true,
        filter: filterFunction,
        container:`#${prefix}_appointment_scheduler_container`
      };
      

      const myDatepicker = new Datepicker( 
        htmlElement,
        options

      );
      
      //setSelectedDate(options.selected);

      
      
      //htmlElement.addEventListener("dateChange.te.datepicker", (e) => {/*setSelectedDate(e.date);*/ });
      htmlElement.addEventListener("close.te.datepicker", (e) => {e.preventDefault();  /*setTimeout(() => {myDatepicker.open();}, 100)*/});
      myDatepicker.open();
      //Override "focus" to prevent autoscroll
      myDatepicker.datesContainer.focus = () => {};


      myDatepicker._popper.setOptions({
        strategy:'absolute', 
        placement:"bottom-start",
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: [],
            },
          },
        ],
      });
      myDatepicker.disablePortal = true;

      containerHtmlElement.style.height = containerHtmlElement.childNodes[0].clientHeight + containerHtmlElement.childNodes[1].clientHeight + "px";
      appointmentDateInput.style.width = containerHtmlElement.childNodes[1].clientWidth  + 10 + "px";
      activeDateWatch(myDatepicker, null, null);

      
      
    };


    
    init();
    

    //setTimeout(() => {init()}, 1000);
    
    
  },[]);//[prefix, appointmentType, appointmentLocation]);


  

  const onOptionSelected = async (optionId) => {
    if(onBookTime){
      onBookTime(optionId);
    }
  }

  const filterFunction = (date) => {
    if(!timeOptions)return false;
    var result = monthTimeOptions != null ? monthTimeOptions.filter((val) => 
       val.Date.getYear() == date.getYear() 
                && val.Date.getMonth() == date.getMonth()
                && val.Date.getDate() == date.getDate()
        ) : [];
   
    return result.length > 0;
    /*
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
  
    return !isSaturday && !isSunday;
    */
  }

  return (
<>

    <div id={`${prefix}_appointment_scheduler_main`} className="flex flex-wrap w-full justify-center sm:justify-start">
        <div id={`${prefix}_appointment_scheduler_container`} className="appointment-scheduler-container">
          <div
            id={`${prefix}_appointment_scheduler`}
            className="relative mb-3 appointment-scheduler "
          >
            <div >
              
              <div>
                <input
                  type="text"
                  className="appointment-date-input peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Select Appointment Date"
                  id={`${prefix}_appointmentDateInput`}
                />
                
                <label
                  htmlFor={`${prefix}_appointmentDateInput`}
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  
                </label>
              </div>
            </div>
          </div>
        </div>
      
     

      <div className="appointment-time-list  ml-1 sm:ml-4 flex flex-wrap sm:mb-14 mb-1">

        <div className="selected-appointment-date w-full mt-6 mb-3">
          {selectedDate.toDateString()}  
        </div>  

        <div className={"w-full flex pt-4 flex " + (timesLoaded && !isProcessingData ? "hidden_div" : "")}>
          <div className="mr-4 mt-1">Loading&nbsp;data...</div>
          <div >
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
          </div>
        </div>
        {timesLoaded ? (
          <>
          <div className="w-full flex ">
            {(timeOptions != null && timeOptions.length > 0) ? (
              <>
                <div className=" mb-2 pb-1 flex flex-wrap"> 
                
                  
                    {timeOptions.map( (val) => {

                      return (
                        <>
                          
                            <Link  
                              href="#"
                              onClick={(e) => { e.preventDefault(); onOptionSelected(val.id) }}
                              >
                                <>
                                  <div className="appointment-time-option">
                                    {val.label}
                                  </div> 
                                </>
                            </Link>
                            
                        </>
                      )
                    })}
                  
                </div>
              </>
              ) : (
                <>
                  <div className="no-appointment-options w-full mb-2 pb-1" dangerouslySetInnerHTML={{__html:noAvailabilityMessage}}>
                  </div>
                </> 

              )
            }
          </div>
        </>
        ) : null }
      </div>
    </div>

    </>

   );
/*
  function onChange(date) {
    setDate(date);
  }

  return (
      <>
        <div className="flex w-full bg-green-500">
          <div>
            <DatePicker 
              selected={date} 
              onChange={onChange} 
              className="appointment-date-picker-input"
              calendarClassName="appointment-date-picker"
              showPopperArrow={false}
              open={true}
              minDate={new Date()}
              maxDate={new Date('11/11/2023')}
              excludeDates={[new Date('10/15/2023')]}

            />;
          </div>
          <div>
            <div>10:30</div>
            <div>11:30</div>
          </div>
        </div>
      </>
  )
  */
};

export default AppointmentScheduler;
