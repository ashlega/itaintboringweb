//import Layout from "../components/layout"

import Feature from "../../components/Feature";
import About from "../../components/About";
import Pricing from "../../components/Pricing";
import Hero from "../../components/Hero";
import Layout from "../../components/Layout/Layout";
import SeoHead from "../../components/SeoHead";
import React, { useContext } from 'react';
import AppContext from "../../components/Context/AppContext";
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import OpenaiPlayground from "../../components/AI/OpenaiPlayground"



import ClientRequests from "../../components/Requests/ClientRequests";

export default function IndexPage() {

  const { data: session } = useSession()

  const { appState, setAppState } = useContext(AppContext);
  return (
   <>
    <SeoHead title='Treecat Software Inc' />
    <Layout>
      <>
        <div className="mt-24 px-6 sm:px-8 lg:px-16 mx-auto pb-2 max-w-screen-xl text-left pageHeader flex ">
          <OpenaiPlayground />
        </div>
      </>
    </Layout>
  </>
  )
}
