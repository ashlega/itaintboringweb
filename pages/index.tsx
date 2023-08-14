//import Layout from "../components/layout"
import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import LayoutVPN from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";



export default function IndexPage() {
  return (
   <>
    <SeoHead title='LaslesVPN Landing Page' />
    <LayoutVPN>
      <Hero />
      <Feature />
      <Pricing />
    </LayoutVPN>
    </>
  )
}
