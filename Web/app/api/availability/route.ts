import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'


import { getCache } from "../../../utils/cache"
 

function isDayGreaterEqual(date1 : Date, date2 : Date) {
  return date1.getFullYear() > date2.getFullYear() || 
     (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() > date2.getMonth()) || 
     (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() == date2.getMonth()) && (date1.getDate() >= date2.getDate());
}
export async function POST(req: Request)
{
  const data = await req.json()
  const appointmentType = data.type;
  const appointmentLocation = data.location;
  const activeDate = new Date(data.date);


  var options = [
    {Date: new Date(2023, 9, 23), label: "11:00", id: 11},
    {Date: new Date(2023, 9, 21), label: "11:00", id: 11},
    {Date: new Date(2023, 9, 24), label: "12:00", id: 12},
    {Date: new Date(2023, 9, 25), label: "13:00", id: 13},
    {Date: new Date(2023, 9, 26), label: "14:00", id: 10},
    {Date: new Date(2023, 9, 23), label: "15:00", id: 11},
    {Date: new Date(2023, 9, 1), label: "11:00", id: 11},
    {Date: new Date(2023, 9, 22), label: "16:00", id: 12},
    {Date: new Date(2023, 9, 23), label: "16:00", id: 12},
    {Date: new Date(2023, 9, 23), label: "17:00", id: 13},
    {Date: new Date(2023, 9, 23), label: "18:00", id: 11},
    {Date: new Date(2023, 9, 23), label: "19:00", id: 12},
    {Date: new Date(2023, 9, 23), label: "20:00", id: 13},
    {Date: new Date(2023, 9, 23), label: "16:00", id: 12},
    {Date: new Date(2023, 9, 23), label: "17:00", id: 13},
    {Date: new Date(2023, 9, 23), label: "18:00", id: 11},
    {Date: new Date(2023, 9, 23), label: "19:00", id: 12},
    {Date: new Date(2023, 9, 23), label: "20:00", id: 13},
    {Date: new Date(2023, 10, 23), label: "20:00", id: 13},
    {Date: new Date(2024, 5, 23), label: "20:00", id: 13},
  ];

  console.log(data.date);
  var today = new Date();
  console.log("Today:" + today)

  var content = options.filter((val) => val.Date.getMonth() >= activeDate.getMonth() &&
                                 val.Date.getFullYear() >= activeDate.getFullYear() &&
                                 isDayGreaterEqual(val.Date, today) &&
                                 val.Date.getFullYear() == activeDate.getFullYear() && 
                                 val.Date.getMonth() == activeDate.getMonth() 
                                        );

  /*
  const url = process.env.API_CONTENT_URL+"&name="+name
  
  var content = await cache.get(cache.getContentCacheKey(name))
  if(!content){
    const response = await fetch(url, { cache: 'no-cache' })
    content = await response.json()
    await cache.set(name, content)
  }
  */
  return NextResponse.json( {  result:"OK", error: null, data: content })
}