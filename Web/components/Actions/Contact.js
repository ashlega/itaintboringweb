import React, { useState, useEffect, useContext} from "react";
import ButtonPrimary from "../misc/ButtonPrimary";
import ButtonOutline from "../misc/ButtonOutline.";
import SiteSettings from "../../utils/SiteSettings"
import { signIn, signOut, useSession } from "next-auth/react"
import AppContext from "../Context/AppContext";
import { addNewRequest } from "../../utils/requestFunctions"
import  ButtonOnPage  from "../../components/misc/ButtonOnPage"
import { getRequestTypes } from "../../utils/requestTypeFunctions"
import { Link as LinkScroll, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


const Contact = () => {

  const {data: session, update: sessionUpdate, status} = useSession()
  const { appState, setAppState } = useContext(AppContext);
  //const [ formVisible, setFormVisible ] = useState(false);
  const [isProcessingData, setIsProcessingData] = useState(false);


  const [data, setData] = useState({
    details: "",
    name: "",
    email: "",
    subject: ""
  });

  const [createdId, setCreatedId] = useState(null);

  useEffect(()=>
  {
    //var contactFormDiv = document.getElementById("contactFormDiv");
    if(appState.isContactFormOpen) 
    {
      //alert(scroll);
      scroller.scrollTo("contactFormElement", {
        duration: 1500,
        delay: 100,
        smooth: true,
        //containerId: 'ContainerElementID',
        offset: 20
      })
      //contactFormDiv.scrollIntoView()
    }
    //setFormVisible(appState.isContactFormOpen);
  }, [appState.isContactFormOpen])

  const openContactUs = () => {
    /*if(session && session.user?.id){
      setAppState({...appState, selected:"requests"});
    }

    else{*/
      setAppState({...appState, isContactFormOpen:true});
      setData({
        details: "",
        name: "",
        email: "",
        subject: ""
      });
      setCreatedId(null);
    //}
  }
   
  const onChange = (e) =>
  {
    setData({...data,  [e.target.name] : e.target.value})
  }

  const cancelRequest = () => 
  {
    setData({
      details: "",
      name: "",
      email: "",
      subject: ""
    });
    setAppState({...appState, isContactFormOpen:false});
  }

  const sendQuestion = () => 
  {
    if(isProcessingData) return;

    setIsProcessingData(true);
    addNewRequest(data.subject, 
      getRequestTypes().length > 0 ? getRequestTypes()[0].Id : "", 
      data.details, data.name, data.email).then((response) =>
    {
      //setIsEditorMode(false);
      setIsProcessingData(false);
      setAppState({...appState, isContactFormOpen:false, reloadRequestList:true});
      setCreatedId(response.name);
    });
    
  
    
  }

  

  return (
   
    <>
     {!appState.isContactFormOpen  ? (
        <>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex  mb-6 sm:mb-0 text-center">
                  {!createdId ? (
                  <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium ">
                    Got a question?
                  </h5>
                  ) : (
                  <p className="mr-4">
                    Thank you for reaching out! We will get back to you regarding your request #{createdId} as soon as we can! 
                  </p>
                  )}
                </div>
                <ButtonPrimary  onClick={openContactUs}>Contact&nbsp;Us</ButtonPrimary>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
                >

              </div>
        </>
        ) : (
          <>
          <Element name="contactFormElement">
          <div  className="absolute rounded-xl x py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex justify-between items-center z-10 bg-white-500 ">
              <div className="w-full text-left  mb-6 sm:mb-0">
                <div className="w-full text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Got a question?
                </div>
                <div
              className="mt-2 block w-full rounded-lg bg-white p-6 request_form shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              {!session || !session.user?.id ? (
                <>
                    <p className="text-black-600 mb-1 font-medium text-base">* Your Name:</p>
                    <input type="text" name="name" onChange={onChange} value={data.name}></input>

                    <p className="text-black-600 mb-1 font-medium text-base">* Email Address:</p>
                    <input type="text" name="email" onChange={onChange} value={data.email}></input>
                </>
              ) : ("")}

                    <p className="text-black-600 mb-1 font-medium text-base">* Subject:</p>
                    <input type="text" name="subject" onChange={onChange} value={data.subject}></input>
                    
                    <p className="text-black-600 mb-1 mt-1  font-medium text-base">* Message:</p>
                    <textarea onChange={onChange} name="details" value={data.details} ></textarea>
                </div>
                <div className="w-full text-left mt-2">
                  <ButtonOnPage  
                      onClick={sendQuestion} 
                      addClass="mr-2"
                      isEnabled={!isProcessingData && 
                        data.details != "" && data.subject != "" && 
                        (session && session.user?.id || data.name != "" && data.email != "")}
                  >Submit</ButtonOnPage>
                  <ButtonOnPage  onClick={cancelRequest}>Cancel</ButtonOnPage>
                </div>
            </div>
            
          </div>
          </Element>
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: "blur(114px)" }}
            >

          </div>
          </>
        )
      }
    </>    
      
  );
};

export default Contact;