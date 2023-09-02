//import Layout from "../components/layout"
import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import LayoutVPN from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import React, { useContext } from 'react';
import AppContext from "../components/Context/AppContext";

import ClientRequests from "../components/Requests/ClientRequests";

export default function IndexPage() {

  const { appState, setAppState } = useContext(AppContext);
  return (
   <>
    <SeoHead title='Treecat Software Inc' />
    <LayoutVPN>
      <ClientRequests isVisible={appState.selected == "requests"}/>
        {appState.selected == "home" ? (
        <>
          <Hero />
          <Feature />
          <Pricing />
        </>
        ) : ("")}

    </LayoutVPN>
    </>
  )
}
