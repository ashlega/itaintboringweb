import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  var cache = getCache();
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  var url = process.env.API_UNSUBSCRIBE_URL+"&id="+id
  const response = await fetch(url, { cache: 'no-cache' })
  const content = await response.json()

  const session = await getServerSession(authOptions);
  var anySession : any = session
  if(session?.user?.email){
    var cacheKey = cache.getUserCacheKey(anySession?.user?.email, anySession?.user?.provider);
    await cache.del(cacheKey)
  }
  return NextResponse.json( { data: content })
}

