import { SessionProvider } from "next-auth/react"
//import "./styles.css"
import "tw-elements/dist/css/tw-elements.min.css";
import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/project.css";
import   AppContext   from "../components/Context/AppContext"
import React, { useState } from "react";

import  ErrorMessage  from "../components/Popup/ErrorMessage.js"
import  ConfirmationPopup  from "../components/Popup/ConfirmationPopup.js"
import  ProcessingOverlay  from "../components/Popup/ProcessingOverlay.js"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
/*
const appState = {
  status: "loading"
}
*/


// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {

  const [appState, setAppState] = useState(
    {status : "loading", 
     selected : "home", 
     error: {
      visible: false,
      title: "Error",
      message: null
     },
     confirmationRequest: {
      visible: false,
      title: "Confirmation",
      message: null,
      source: null,
      result: null
     },
     processingOverlay: {
        visible: false,
        title: ""
     }

    });
  return (
    <AppContext.Provider value={{appState: appState, setAppState: setAppState}}>
      <ErrorMessage visible={appState.error.visible} title={appState.error.title} message={appState.error.message}/>
      <ConfirmationPopup visible={appState.confirmationRequest.visible} title={appState.confirmationRequest.title} 
         message={appState.confirmationRequest.message}/>
      <ProcessingOverlay/>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppContext.Provider>
  )
  
}
