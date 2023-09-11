import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"


export const revalidate = 0

export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url)
  const activeOnly = searchParams.get('active_only')

  const anySession : any = session;
  if(!anySession?.user?.id)
  {
    return NextResponse.json( { data: null }) 
  }
  else{
    var url = SiteSettings.REQUEST_LIST_URL+"&userid=" + anySession?.user?.id+"&active_only="+activeOnly;

    var result : any[] = []
    console.log("LIST CACHE " + url)
    if(await getCache().get(url)){
      result = await getCache().get(url)
    }
    else
    {
      const response = await fetch(url, { cache: 'no-cache', next: { tags: [SiteSettings.REQUEST_LIST_TAG+anySession?.user?.id ?? "empty"] } })
      const content = await response.json()
      
      content.map((request : any) => 
      {
        result.push({
          subject: request.ita_subject,
          name: request.ita_name,
          id: request.ita_requestid,
          details: request.ita_details,
          request_type: request["_ita_requesttype_value"],
          request_type_name: request["_ita_requesttype_value@OData.Community.Display.V1.FormattedValue"],
          status_name: request["statuscode@OData.Community.Display.V1.FormattedValue"],
          createdon: request["createdon"],
          modifiedon: request["modifiedon"]
        });
      })
      await getCache().set(url, result)
    }

    return NextResponse.json( { data: result })
  }
}

