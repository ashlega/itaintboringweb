import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'

import { getCache } from "../../../utils/cache"

export const revalidate = 0

/*
function getQueryVariable(query: string, name : string)
{
   var ind = query.indexOf("?");
   if(ind > 0){
    query = query.substring(ind+1);
    console.log(query)
    var vars = query.split("?");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == name){
              return pair[1];
            }
    }
  }
  return null;
}
*/

export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  
  const { searchParams } = new URL(request.url)
  
  const requestid = searchParams.get('requestid')
  
  var cache = getCache();
  
  var userId = anySession?.user?.id;
  if(!userId)
  {
    return NextResponse.json( { data: null }) 
  }
  else{
    
    const cacheKey = cache.getRequestCommentListCacheKey(session, requestid);
    var result : any[] = []
    if(await cache.get(cacheKey)){
      result = await cache.get(cacheKey)
    }
    else {
      const url = SiteSettings.COMMENT_LIST_URL+"&userid=" + userId+"&requestid="+requestid;
      const response = await fetch(url, { cache: 'no-cache' })
      const content = await response.json()
      
      content.map((comment : any) => 
      {
        result.push({
          name: comment.ita_name,
          id: comment.ita_commentid,
          details: comment.ita_details,
          status_name: comment["statuscode@OData.Community.Display.V1.FormattedValue"],
          createdby: comment["_ita_authenticationid_value@OData.Community.Display.V1.FormattedValue"] ? SiteSettings.CLIENT_GENERIC_NAME_COMMENTS : SiteSettings.SUPPORT_GENERIC_NICKNAME,
          createdon: comment["createdon"],
          modifiedon: comment["modifiedon"]
        });
      })
      await cache.set(cacheKey, result)
    }
  }

  return NextResponse.json( { data: result })
}

