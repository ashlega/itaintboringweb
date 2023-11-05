import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'


import { getCache } from "../../../utils/cache"
 


export async function POST(req: Request)
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  var userId = anySession?.user?.id;

  if(!userId)
  {
    return NextResponse.json( {  result:"ERROR", error: "Your session may have expired. Please try signing in again" })
  }
  else{
    const data = await req.json()
    const appointmentType = data.type;
    const appointmentLocation = data.location;
    const timeSlotId = data.timeSlotId;
    const activeDate = new Date(data.date);
    const timeZoneOffset = activeDate.getTimezoneOffset();

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
    
    return NextResponse.json( {  result:content.result, error: content.error, data: content.data })
  }
}