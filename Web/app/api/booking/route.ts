import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'


import { getCache } from "../../../utils/cache"
 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;

  var cache = getCache();
  const { searchParams } = new URL(request.url)
  const bookingid = searchParams.get('bookingid')
  
  
  var userId = anySession?.user?.id;
  if(!userId)
  {
    return NextResponse.json( { result: "ERROR", error: "Please sign in first" }) 
  }
  else{
    try{
      //Because of the "participation instructions", removing cache for now
      //var cacheKey = cache.getBookingCacheKey(anySession, bookingid)
      //var content = await cache.get(cacheKey)
      //if(!content){

        const response = await fetch(process.env.API_BOOKING_DETAILS_URL ?? "", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userid: anySession?.user?.id, bookingId: bookingid}),
        })

        var content = await response.json()
        //await cache.set(cacheKey, content)
      //}
      var data = {
        name: content.data.ita_name,
        id: content.data.ita_itaservicebookingid,
        start: content.data["availability.ita_start"],
        end: content.data["availability.ita_end"],
        serviceDisplayName: content.data["service.ita_displayname"],
        serviceDescription: content.data["service.ita_description"],
        locationDisplayName: content.data["location.ita_displayname"],
        extraDetails: content.data["availability.ita_participationinstructions"],
      };
      return NextResponse.json( { result: "OK", data: data })
    }
    catch(e) {
      return NextResponse.json( { result: "ERROR", error: "An error has occurred" }) 
    }
  }
}

export async function POST(req: Request)
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  var userId = anySession?.user?.id;

  var cache = getCache();

  if(!userId)
  {
    return NextResponse.json( {  result:"ERROR", error: "Your session may have expired. Please try signing in again" })
  }
  else{
    const data = await req.json()
    const timeSlotId = data.timeSlotId;

    const url = process.env.API_BOOKING_URL;

    const response = await fetch(process.env.API_BOOKING_URL ?? "", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
            timeSlotId: timeSlotId,
            userid: userId,
        }),
    })
    

    const content = await response.json()

    const cacheKey = cache.getBookingListCacheKey(session);
    //if(await cache.get(cacheKey)){
    await cache.del(cacheKey)
    //}
    
    
    return NextResponse.json( {  result:content.result, error: content.error, data: content.data })
  }
}

export async function DELETE(req: Request)
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  var userId = anySession?.user?.id;

  var cache = getCache();

  if(!userId)
  {
    return NextResponse.json( {  result:"ERROR", error: "Your session may have expired. Please try signing in again" })
  }
  else{
    const data = await req.json()
    const bookingId = data.bookingId;

    const url = process.env.API_BOOKING_URL;

    const response = await fetch(process.env.API_CANCEL_BOOKING_URL ?? "", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
            bookingId: bookingId,
            userid: userId,
        }),
    })
    

    const content = await response.json()

    var cacheKey = cache.getBookingListCacheKey(session);
    //if(await cache.get(cacheKey)){
    await cache.del(cacheKey)
    cacheKey = cache.getBookingCacheKey(anySession, bookingId);
    await cache.del(cacheKey)
    //}
    
    
    return NextResponse.json( {  result:content.result, error: content.error, data: content.data })
  }
}

