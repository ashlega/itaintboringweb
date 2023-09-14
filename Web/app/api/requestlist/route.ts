import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"


export async function GET(request: Request) 
{
  var cache = getCache();
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url)
  const activeOnly = searchParams.get('active_only')

  const anySession : any = session;
  if(!anySession?.user?.id)
  {
    return NextResponse.json( { data: [] }) 
  }
  else{
    var url = SiteSettings.REQUEST_LIST_URL+"&userid=" + anySession?.user?.id+"&active_only="+activeOnly;
    var cacheKey = "";
    if(activeOnly == "true") cacheKey =cache.getActiveRequestListCacheKey(session);
    else cacheKey =cache.getInActiveRequestListCacheKey(session);

    var result : any[] = []
    if(await cache.get(cacheKey)){
      result = await cache.get(cacheKey)
    }
    else
    {
      const response = await fetch(url, { cache: 'no-cache'})
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
      await cache.set(cacheKey, result)
    }

    return NextResponse.json( { data: result })
  }
}

