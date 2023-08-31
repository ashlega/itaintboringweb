//import Layout from "../components/layout"
import LayoutVPN from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import ClientRequests from "../components/Requests/ClientRequests";

export default function RequestsPage() {

  const { data: session } = useSession()
  const [content, setContent] = useState()


  if (!session) {
    return (
      <LayoutVPN>
        <AccessDenied />
      </LayoutVPN>
    )
  }
  return (
   <>
    <SeoHead title='My Requests' />
    <LayoutVPN>
      <ClientRequests />

    </LayoutVPN>
    </>
  )
}
