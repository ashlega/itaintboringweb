import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  
  if(!session || !session?.user?.email){
    return NextResponse.json({ error: 'Please make sure you have logged in before attempting this action' }, { status: 401 })
  }
  else{
    var cache = getCache();

    var url = process.env.API_SUBSCRIBE_URL+"&email="+session?.user?.email
    const response = await fetch(url, { cache: 'no-cache' })
    const content = await response.json()

    var anySession : any = session
    if(session?.user?.email){
      var cacheKey = cache.getUserCacheKey(anySession?.user?.email, anySession?.user?.provider);
      await cache.del(cacheKey)
    }

    return NextResponse.json( { data: content })
  }
}

