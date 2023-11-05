import { NextResponse } from 'next/server'
import SiteSettings from "../../../utils/SiteSettings"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { getCache } from "../../../utils/cache"

 
export async function GET(request: Request) 
{
  const url = process.env.API_SERVICE_TYPES_URL ?? ""

  var cache = getCache();
  var serviceList : any = null
  serviceList = await cache.get("service_list")
  
  if(!serviceList){
    const response = await fetch(url, { cache: 'no-cache' })
    const content = await response.json()
    serviceList = []
    if(content.result){
      content.data.map((service : any) => 
      {
        serviceList.push({
          serviceName: service.ita_name,
          serviceDisplayName: service.ita_displayname,
          locationName: service["location.ita_name"],
          locationDisplayName: service["location.ita_displayname"],
          subscriptionRequired: service.ita_subscriptionrequired,
          serviceDescription: service.ita_description
        });
      })
      await cache.set("service_list", serviceList, 60*60*1)
    }
  }
  return NextResponse.json( { 
    result: "OK", 
    error: null, 
    data: serviceList
  })
}