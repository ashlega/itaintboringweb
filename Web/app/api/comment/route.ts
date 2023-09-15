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
  var cache = getCache();

  const data = await req.json()

  const anySession : any = session;

  var userId = anySession?.user?.id;

  if(userId)
  {

    const response = await fetch(process.env.API_COMMENT_ADD_URL ?? "", {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, userid: userId}),
    })
    

    const cacheKey = cache.getRequestCommentListCacheKey(session, data.requestid);
    if(await cache.get(cacheKey)){
      await cache.del(cacheKey)
    }

    const comment = await response.json()

    var result = {
        name: comment.ita_name,
        id: comment.ita_commentid,
        details: comment.ita_details,
        status_name: comment["statuscode@OData.Community.Display.V1.FormattedValue"],
        createdby: comment["_ita_authenticationid_value@OData.Community.Display.V1.FormattedValue"] ? SiteSettings.CLIENT_GENERIC_NAME_COMMENTS : SiteSettings.SUPPORT_GENERIC_NICKNAME,
        createdon: comment["createdon"],
        modifiedon: comment["modifiedon"]
    }

    return NextResponse.json( result )
  }
  else return NextResponse.json( null )

}