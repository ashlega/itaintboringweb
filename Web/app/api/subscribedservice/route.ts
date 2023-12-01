import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"


export async function GET(request: Request) 
{

  var cache = getCache();
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  if(!anySession?.user?.id)
  {
    return NextResponse.json( { data: [] }) 
  }
  else{
    
    var cacheKey = cache.getSubsribedServicesCacheKey(session);
    var result : any[] = await cache.get(cacheKey)

    if(!result){
      var url = process.env.API_SUBSCRIBED_SERVICES_URL+"&userid=" + anySession?.user?.id;
      const response = await fetch(url, { cache: 'no-cache'})
      const content = await response.json()
      //TODO - fill in "reslt" array
      result = content.data
      await cache.set(cacheKey, result, 60*60)
    }

    return NextResponse.json( { data: result })
  }
}

