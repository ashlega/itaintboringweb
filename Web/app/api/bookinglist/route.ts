import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'

import { getCache } from "../../../utils/cache"

export const revalidate = 0



export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  
  var cache = getCache();

 
  var userId = anySession?.user?.id;
  if(!userId)
  {
    return NextResponse.json( { data: null }) 
  }
  else{
    
    const cacheKey = cache.getBookingListCacheKey(session);
    var result : any[] = []
    if(await cache.get(cacheKey)){
      result = await cache.get(cacheKey)
    }
    else {
      const url = process.env.API_BOOKING_LIST_URL+"&userid=" + userId;
      const response = await fetch(url, { cache: 'no-cache' })
      const content = await response.json()
      
      content.map((booking : any) => 
      {
        result.push({
          name: booking.ita_name,
          id: booking.ita_itaservicebookingid,
          start: booking["availability.ita_start"],
          end: booking["availability.ita_end"],
          serviceDisplayName: booking["service.ita_displayname"],
          serviceDescription: booking["service.ita_description"],
          locationDisplayName: booking["location.ita_displayname"],
          extraDetails: booking["availability.ita_participationinstructions"]
        });
      })
      await cache.set(cacheKey, result)
    }
  }

  return NextResponse.json( { result: "OK", error : null, data: result })
}

