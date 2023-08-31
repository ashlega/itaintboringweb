import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import SiteSettings from "../../utils/SiteSettings"
import { requestTypes, getRequestTypes } from "../../utils/requestTypeFunctions"
import { addNewRequest } from "../../utils/requestFunctions"
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"


const RequestEditor = ({ setIsEditorMode, reloadRequests, request= {
     isNew : true,
     current: null
  }
} ) => {
  /*
  const [ reqTypes, setReqTypes ] = useState([]);

  useEffect(() => {
    var rTypes = getRequestTypes();
    setReqTypes(rTypes);
  }, []);
  
*/

  const [isProcessingData, setIsProcessingData] = useState(false);
 
  const getDefaultRequestType = () => {
    return requestTypes[0].Id;
  }

  const [data, setData] = useState({
    subject: request?.current?.subject,
    requestType:getDefaultRequestType(),
    details: request?.current?.details
  });


  useEffect( () => {
    const init = async () => {
      const { Collapse , initTE } = await import("tw-elements");
      initTE({ Collapse });
      //const dataTableElement = document.getElementById('datatable_request_list');
      //var dt = new Datatable(dataTableElement, requestListData, { loading: false, noFoundMessage: "No data found." });
      //dt.sort(requestListData.columns[0], "desc");
      //setDataTable(dt);
    };
    init();
  }, []);

  const onChange = (e) =>
   {
    setData({...data,  [e.target.name] : e.target.value})
   }

  const submitNewRequest = () => 
  {
    if(isProcessingData) return;

    setIsProcessingData(true);
    addNewRequest(data.subject, data.requestType, data.details).then((data) =>
    {
      if(reloadRequests) reloadRequests();
      setIsEditorMode(false);
    });
    
  }

  return (
    <div className="mt-24 px-6 sm:px-8 lg:px-16 justify-center w-full text-center ">
      <h1 className="requestHeader">{request?.isNew ? ( 
         "New Request"
      ) : (
        "Request # " + request?.current?.name
      )}</h1>
      

      <div className="w-full pt-2 px-6 sm:px-8 lg:px-16 bg-white-300 justify-center request_form">
        <b>Subject:</b>
        <input type="text" name="subject" onChange={onChange} value={data.subject} readOnly={request?.current}></input>
        <b>Request Type:</b>
        <select name="requestType" onChange={onChange} disabled={request?.current}>
        { requestTypes?.map((tp, index) => ( 
            <option value={tp.Id} 
            selected={data.requestType==tp.Id}>{tp.Name}</option>
        ))
        }
          
        </select>
        <b>Details:</b>
        <textarea onChange={onChange} name="details" value={data.details} readOnly={request?.current}></textarea>
      </div>

      {!request?.isNew ? ( 
        <div id="accordionExample5">
          <div
            class="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 class="mb-0" id="headingOne5">
              <button
                class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                type="button"
                data-te-collapse-init
                data-te-target="#collapseOne5"
                aria-expanded="true"
                aria-controls="collapseOne5">
                Accordion Item #1
                <span
                  class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne5"
              class="!visible"
              data-te-collapse-item
              data-te-collapse-show
              aria-labelledby="headingOne5">
              <div class="px-5 py-4">
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that just
                about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div
            class="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 class="mb-0" id="headingTwo5">
              <button
                class="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                type="button"
                data-te-collapse-init
                data-te-collapse-collapsed
                data-te-target="#collapseTwo5"
                aria-expanded="false"
                aria-controls="collapseTwo5">
                Accordion Item #2
                <span
                  class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id="collapseTwo5"
              class="!visible hidden"
              data-te-collapse-item
              aria-labelledby="headingTwo5">
              <div class="px-5 py-4">
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that just
                about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div
            class="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 class="mb-0" id="headingThree5">
              <button
                class="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                type="button"
                data-te-collapse-init
                data-te-collapse-collapsed
                data-te-target="#collapseThree5"
                aria-expanded="false"
                aria-controls="collapseThree5">
                Accordion Item #3
                <span
                  class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id="collapseThree5"
              class="!visible hidden"
              data-te-collapse-item
              aria-labelledby="headingThree5">
              <div class="px-5 py-4">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that just
                about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      ) : (

      <div className="w-full px-6 sm:px-8 lg:px-16 bg-white-300 justify-center text-center request_buttons flex">
                  <ButtonOnPage 
                    onClick={submitNewRequest}
                    isEnabled={!isProcessingData && data.details != "" && data.subject != "" }
                  >
                    Submit
                  </ButtonOnPage>
                  <ButtonOnPage 
                    onClick={() => setIsEditorMode(false)}
                  >
                    Cancel
                  </ButtonOnPage>
      </div>
      )}

    </div>
  );
};

export default RequestEditor;
