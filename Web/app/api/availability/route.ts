import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'


import { getCache } from "../../../utils/cache"
 
const padZeroLeft = function (nm : number) { 
  if(nm < 10) return "0"+nm;
  else return nm;
};

function isDayGreaterEqual(date1 : Date, date2 : Date) {
  return date1.getFullYear() > date2.getFullYear() || 
     (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() > date2.getMonth()) || 
     (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() == date2.getMonth()) && (date1.getDate() >= date2.getDate());
}
export async function POST(req: Request)
{
  const data = await req.json()
  const serviceType = data.type;
  const serviceLocation = data.location;
  
  const activeDate = new Date(data.date);
  const nextMonth = new Date(data.date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const timeZoneOffset = activeDate.getTimezoneOffset();

  const url = process.env.API_AVAILABILITY_URL;
  const response = await fetch(process.env.API_AVAILABILITY_URL ?? "", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
          "location": serviceLocation,
          "service": serviceType,
          "start_month": activeDate.getMonth()+1,
          "start_day": 1,//activeDate.getDate(),
          "start_year": activeDate.getFullYear(),
          "end_month": nextMonth.getMonth()+1,//nextMonth.getMonth(),
          "end_day": 1,
          "end_year": nextMonth.getFullYear()
      }),
  })


  const result = await response.json()
  var options : any[] = []  
  result.map((timeSlot : any) => 
  {
    var dt = new Date(timeSlot["ita_start"]);
    var dtEnd = new Date(timeSlot["ita_end"]);
    dt.setMinutes(dt.getMinutes() - timeZoneOffset);
    dtEnd.setMinutes(dtEnd.getMinutes() - timeZoneOffset);
    options.push({
      Date: dt,
      label: padZeroLeft(dt.getUTCHours()) + ":" + padZeroLeft(dt.getUTCMinutes()) + " - " + padZeroLeft(dtEnd.getUTCHours()) + ":" + padZeroLeft(dtEnd.getUTCMinutes()),
      id: timeSlot["ita_itaavailabilityid"]
    });
  })
  //await cache.set(cacheKey, result)

/*

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
  */
  var today = new Date();
  //console.log("Today:" + today)

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