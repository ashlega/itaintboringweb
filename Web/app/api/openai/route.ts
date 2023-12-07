import OpenAI from "openai"
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"

//import { revalidateTag } from 'next/cache'
 
const openai = new OpenAI()

export async function POST(req: Request) 
{
  var cache = getCache();
  const session = await getServerSession(authOptions);

  const data = await req.json()

  const anySession : any = session;
//...(data.messages.length > 1 && data.messages[0].role == "system" ? [...data.messages.slice(1)] : 
  const maxChatLength : number = +(process.env.OPENAI_API_MAX_LENGTH ?? "10")
  if(data.messages.length > maxChatLength) data.messages = data.messages.slice(data.messages.length - maxChatLength)
  const completion = await openai.chat.completions.create({
    messages: [
      {"role":"system", "content": process.env.OPENAI_API_SYSTEM ?? ""},
        ...data.messages
      ],
    model: process.env.OPENAI_API_MODEL ?? "gpt-3.5-turbo"//data.model
  })
  var result = {
    result: "OK", 
    data: completion
  }

  return NextResponse.json( result )
  
  /*

  if((anySession?.user?.id || data.email) && process.env.API_REQUEST_ADD_URL)
  {

    const response = await fetch(process.env.API_REQUEST_ADD_URL, {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, userid: anySession?.user?.id}),
    })
    
    if(anySession?.user?.id){
      var cacheKey = cache.getActiveRequestListCacheKey(session);
      await cache.del(cacheKey);
      cacheKey = cache.getInActiveRequestListCacheKey(session);
      await cache.del(cacheKey);
    }

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
  */

}