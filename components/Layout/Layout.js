import React, { useContext, useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Content from "../Content";
import ButtonOutline from "../misc/ButtonOutline.";


import { signIn, signOut, useSession } from "next-auth/react"


const Layout = ({ children }) => {

  const {data: session, update: sessionUpdate, status} = useSession()

  const [ consentContentLoaded, setConsentContentLoaded ] = useState(false);

  const consentAccept = async () => {
    const response = await fetch(`/api/user/consentaccept`);
    const data = await response.json()
    
    sessionUpdate();

  }

  

  
/*
  if(session)
  {
    if(callbackUrl)
    {
      window.location = callbackUrl;
      return;
    }
    
  }
*/
  if(session && !session.user?.id){
    
    return (
      <>
        <Header />
        <Content name='NEW_USER_CONSENT' setContentLoaded={setConsentContentLoaded} className="user_consent bg-gradient-to-b from-white-500 to-white-300 px-6 sm:px-8 lg:px-16 mt-24  w-full"/>
        
          {consentContentLoaded ? (
            <div className="w-full pt-4 px-6 sm:px-8 lg:px-16 bg-white-300">
              <button 
                className="font-medium tracking-wide py-1 px-2 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
                onClick={consentAccept}
                >
                Accept
              </button>
              <button 
                className="font-medium tracking-wide mx-2 py-1 px-2 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
                onClick={() => {signOut({ callbackUrl: '/' })}}
              >
                Sign Out
              </button>
            </div>
        ) : ( "" ) }
        <Footer />
      </>
    );
  }
  else {
    return (
      <>
        <Header />
        
        {children}
        <Footer />
      </>
    );
  }
};

export default Layout;
