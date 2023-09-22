import React, { Select, useMemo, useEffect, useState } from "react";
import Image from "next/image";
import SiteSettings from "../../utils/SiteSettings"
import { getRequestTypes } from "../../utils/requestTypeFunctions"
import { addNewRequest } from "../../utils/requestFunctions"
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"
import  LinkedFiles  from "../../components/Content/LinkedFiles"
import { getCommentList, addNewComment } from "../../utils/commentFunctions"



const RequestEditor = ({ setIsEditorMode, reloadRequests, request = {
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

  //const [requestTypes, setRequestTypes] = useState([]);
  const [version, setVersion] = useState(1);
  const [isProcessingData, setIsProcessingData] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [filesLoaded, setFilesLoaded] = useState(false);

  const [ commentList, setCommentList ] = useState([]);
  //debugger
  const getDefaultRequestType = () => {
    
    return getRequestTypes().length > 0 ? getRequestTypes()[0].Id : null;
  }

  const [data, setData] = useState({
    subject: request?.current?.subject,
    requestType:getDefaultRequestType(),
    details: request?.current?.details,
    comment_details: ""
  });
/*
  useEffect( () => {
    const init = async () => {
      //const { Input, initTE } = await import("tw-elements");
      //initTE({ Input });

      var rts = await getRequestTypes();
      setRequestTypes(rts);
    };
    
    init();
    
  }, []);
  */


  useEffect( () => {
    if(request?.current)
    {
      setData({
        subject: request?.current?.subject,
        requestType:getDefaultRequestType(),
        details: request?.current?.details,
        comment_details: ""
      });

      setCommentList([])
      setCommentsLoaded(false)

      getCommentList(request?.current.id).then((response) =>
        {
          var comments = [];
          setCommentsLoaded(true)
          if(response?.data){
            setCommentList(response.data)
          }
        });
    }
    else{
      setData({
        subject: "",
        requestType:getDefaultRequestType(),
        details: "",
        comment_details: ""
      });
    }
  },[request?.current?.id, version]);



  const onChange = (e) =>
   {
     setData({...data,  [e.target.name] : e.target.value})
   }

  

  const submitNewRequest = () => 
  {
    if(isProcessingData) return;

    setIsProcessingData(true);
    addNewRequest(data.subject, data.requestType, data.details).then((response) =>
    {
      
      if(reloadRequests) reloadRequests(response);
      setIsEditorMode(false);
      setIsProcessingData(false);
    });
    
  }

  const submitNewComment = () => 
  {
    if(isProcessingData) return;

    setIsProcessingData(true);
    setVersion(version + 1);
    addNewComment(request.current.id, data.comment_details).then((response) =>
    {
      //if(reloadRequests) reloadRequests(response);
      setCommentList([response, ...commentList]);
      setData({...data, comment_details: ""});
      setIsProcessingData(false);
    });
    
  }

  const getLocalDate = (dt) => {
    var localDate = new Date(dt);
    return localDate.toLocaleString();
  }

  return (
    <>
    <div className="max-w-screen-xl mt-24 px-6 sm:px-8 lg:px-16 justify-left mx-auto flex">
      <div className="requestHeader mr-2">
        {request?.isNew ? ( 
          "New Request"
        ) : (
          "Request # " + request?.current?.name
        )}
      </div>
      <div className="w-full text-right requestStatus">
        {request?.current ? (
          "Status: " + request?.current?.status_name
        ) : ("")}
      </div>
    </div>
    <div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 justify-center mx-auto "> 
      
      <div
  className="block w-full rounded-lg bg-white p-6 request_form shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
 
        <p className="text-black-600 mb-1 font-medium text-base">Subject:</p>
        <input type="text" name="subject" onChange={onChange} value={data.subject} readOnly={request?.current}></input>
        <p className="text-black-600 mb-1 mt-1 font-medium text-base">Request Type:</p>
        <select name="requestType" onChange={onChange} disabled={request?.current}  >

          {getRequestTypes()?.map((tp, index) => (
              <option value={tp.Id} selected={request?.current?.request_type == tp.Id ? "selected" : ""}>{tp.Name}</option>
          )) }
        
        </select>
        
        <p className="text-black-600 mb-1 mt-1  font-medium text-base">Details:</p>
        <textarea onChange={onChange} name="details" value={data.details} readOnly={request?.current}></textarea>
        {request?.current?.id ? (
        <LinkedFiles 
          objectId={request?.current.id} 
          objectType="request" 
          title="Links & Attachments" 
          setContentLoaded={setFilesLoaded}
          className="linked-attachments"
          />
        ):("")}
      
      </div>

     
      {request?.isNew ? ( 
      <div className="w-full mt-6 px-6 sm:px-8 lg:px-16 bg-white-500 justify-center text-center request_buttons flex">
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
      ) : (
      <>
        

        <textarea className="w-full request-comment mt-2"  onChange={onChange} value={data.comment_details}  name="comment_details"  placeholder="Start typing here to add a new comment"></textarea>

        <div className="w-full mt-2 justify-left text-left mb-4 ">
                  <ButtonOnPage 
                    addClass="add-comment"
                    onClick={submitNewComment}
                    isEnabled={!isProcessingData && data.comment_details != ""}
                  >
                    Add
                  </ButtonOnPage>
                  <ButtonOnPage 
                    addClass="add-comment"
                    onClick={() => setIsEditorMode(false)}
                  >
                    Back
                  </ButtonOnPage>
        </div>
        <div className={"w-full flex pt-4 flex " + (commentsLoaded && !isProcessingData ? "hidden_div" : "")}>
          <div className="mr-4 mt-1">Loading&nbsp;comments...</div>
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
        <ol className="border-l border-neutral-300 dark:border-neutral-500 ">
          {commentList.map( (comment) => (  
             
            <li>
              <div className="flex-start flex items-center pt-3">
                <div
                  className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-300 ">
                  {getLocalDate(comment.createdon)} by {comment.createdby}
                </p>
              </div>
              <div className="mb-6 ml-4 mt-2">
                
                <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                   {comment.details}
                </p>
              </div>
            </li>
            
            
          ))}
        </ol>
      </>
        
        )}

    </div>
    </>
  );
};
//<h4 class="mb-1.5 text-xl font-semibold">Title of section 1</h4>

export default RequestEditor;
