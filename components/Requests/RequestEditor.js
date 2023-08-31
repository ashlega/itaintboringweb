import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import SiteSettings from "../../utils/SiteSettings"
import { requestTypes, getRequestTypes } from "../../utils/requestTypeFunctions"
import { addNewRequest } from "../../utils/requestFunctions"
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"

const RequestEditor = ({ setIsEditorMode, reloadRequests, request= {
     isNew : true
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
    subject:"",
    requestType:getDefaultRequestType(),
    details:""
  });

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
        request?.title
      )}</h1>
      

      <div className="w-full pt-2 px-6 sm:px-8 lg:px-16 bg-white-300 justify-center request_form">
        <b>Subject:</b>
        <input type="text" name="subject" onChange={onChange} value={data.subject}></input>
        <b>Request Type:</b>
        <select name="requestType" onChange={onChange}>
        { requestTypes?.map((tp, index) => ( 
            <option value={tp.Id} 
            selected={data.requestType==tp.Id}>{tp.Name}</option>
        ))
        }
          
        </select>
        <b>Details:</b>
        <textarea onChange={onChange} name="details" value={data.details}></textarea>
      </div>

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

    </div>
  );
};

export default RequestEditor;
