import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"

//import { revalidateTag } from 'next/cache'
 
export async function POST(req: Request) 
{
  const session = await getServerSession(authOptions);

  const data = await req.json()

  const anySession : any = session;

  if(anySession?.user?.id)
  {

    const response = await fetch(SiteSettings.REQUEST_ADD_URL, {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, userid: anySession?.user?.id}),
    })
    
    //console.log("LIST CACHE del " + SiteSettings.REQUEST_LIST_URL+"&userid="+anySession?.user?.id+"&active_only=true")

    await getCache().del(SiteSettings.REQUEST_LIST_URL+"&userid="+anySession?.user?.id+"&active_only=true");
    await getCache().del(SiteSettings.REQUEST_LIST_URL+"&userid="+anySession?.user?.id+"&active_only=false");
   // revalidateTag(SiteSettings.REQUEST_LIST_TAG+anySession?.user?.id);

    const request = await response.json()

    var result = {
        subject: request.ita_subject,
        name: request.ita_name,
        id: request.ita_requestid,
        details: request.ita_details,
        request_type: request["_ita_requesttype_value"],
        request_type_name: request["_ita_requesttype_value@OData.Community.Display.V1.FormattedValue"],
        status_name: request["statuscode@OData.Community.Display.V1.FormattedValue"],
        createdon: request["createdon"],
        modifiedon: request["modifiedon"]
    }

    return NextResponse.json( result )
  }
  else return NextResponse.json( null )

}