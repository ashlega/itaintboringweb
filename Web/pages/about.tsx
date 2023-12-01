//import Layout from "../components/layout"
import Feature from "../components/Feature";
import About from "../components/About";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import React, { useContext } from 'react';
import AppContext from "../components/Context/AppContext";
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"



import ClientRequests from "../components/Requests/ClientRequests";

export default function AboutPage() {

  const { data: session } = useSession()

  const { appState, setAppState } = useContext(AppContext);
  return (
   <>
    <SeoHead title='About Treecat Software Inc' />
    <Layout>
      <>
        <About />
      </>
    </Layout>
  </>
  )
}
