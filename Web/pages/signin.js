//import Layout from "../components/layout"
import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import SignIn from "../components/SignIn";
import { providers, signIn, getSession, csrfToken, getProviders } from "next-auth/react";


export default function SigninPage({ providers }) {

  return (
   <>
    <SeoHead title='Treecat Software Inc: Sign In' />
    <Layout>
      <SignIn providers={providers}/>
    </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

