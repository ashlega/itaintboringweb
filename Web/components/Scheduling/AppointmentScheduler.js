"use client";
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'
import { useSession } from "next-auth/react"
import "react-toggle/style.css"
import "react-datepicker/dist/react-datepicker.css";




const AppointmentScheduler = ({prefix}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeOptions = [
    {label: "10:00", value: 10},
    {label: "11:00", value: 11},
    {label: "12:00", value: 12},
    {label: "13:00", value: 13},
    {label: "14:00", value: 10},
    {label: "15:00", value: 11},
    {label: "16:00", value: 12},
    {label: "17:00", value: 13},
    {label: "18:00", value: 11},
    {label: "19:00", value: 12},
    {label: "20:00", value: 13},

  ];



  useEffect(() => {
    const init = async () => {
      const { Datepicker, Input, initTE } = await import("tw-elements");
      initTE({ Datepicker, Input });
      
      var htmlElement = document.getElementById(`${prefix}_appointment_scheduler`);
      var containerHtmlElement = document.getElementById(`${prefix}_appointment_scheduler_container`);
      var appointmentDateInput = document.getElementById(`${prefix}_appointmentDateInput`);
      //const myInput = new Input(htmlElement);
      const options = {
        //min: new Date(2023, 9, 13),
        //max: new Date(2023, 9, 20),
        //removeClearBtn: true,
        disableInput: false,
        disableToggleButton: false,
        inline:true,
        filter: filterFunction,
        container:`#${prefix}_appointment_scheduler_container`
      };
      const myDatepicker = new Datepicker( 
        htmlElement,
        options

      );
      
      
      htmlElement.addEventListener("dateChange.te.datepicker", (e) => {setSelectedDate(e.date)});
      htmlElement.addEventListener("close.te.datepicker", (e) => {e.preventDefault();  /*setTimeout(() => {myDatepicker.open();}, 100)*/});
      myDatepicker.open();


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

      var innerDiv = containerHtmlElement.childNodes[1];

      
      
      containerHtmlElement.style.height = innerDiv.offsetHeight + 20 + "px";
      appointmentDateInput.style.width = innerDiv.offsetWidth + 10 + "px";

      //debugger;
    
      
      
    };
    init();
    
    
  }, []);


  const filterFunction = (date) => {
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
  
    return !isSaturday && !isSunday;
  }

  return (
<>
{selectedDate.toDateString()}


    <div id={`${prefix}_appointment_scheduler_main`} className="flex w-full">
        <div id={`${prefix}_appointment_scheduler_container`} className="appointment-scheduler-container">
          <div
            id={`${prefix}_appointment_scheduler`}
            className="relative mb-3 appointment-scheduler"
          >
            <div className="flex">
              
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
        

      <div className="appointment-time-list flex flex-wrap">
        {timeOptions.map( (val) => {

          return (
            <> 
              <div className="appointment-time-option">
                {val.label}
              </div>
            </>
          )
        })}
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
