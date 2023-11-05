"use client";
import { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";

const ErrorMessage = ({visible, title, message}) => {
  
  const [popup, setPopup] = useState(null);
  const { appState, setAppState } = useContext(AppContext);

  useEffect(() => {
    
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      const locPopup = new Modal(document.getElementById("popupModal"), {});
     
      setPopup(locPopup)
    };
    init();
  },[]);

  useEffect(() => {
    if(popup){
      popup.toggle();
      //if(visible) popup.show();
      //else popup.hide();
    } 
  }, [visible]);

  const hidePopup = () => {
    setAppState({...appState, error: {
      ...appState.error,
      visible: false
  }});
  }

  
  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-15 z-[2055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none pt-5"
        id="popupModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[300px]:mx-auto min-[300px]:mt-7 min-[300px]:max-w-[400px]">
          <div
            className="min-[300px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => {hidePopup();}}
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative flex-auto p-4" data-te-modal-body-ref>
              {message}
            </div>

            <div
              className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                onClick={() => {hidePopup();}}>
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;