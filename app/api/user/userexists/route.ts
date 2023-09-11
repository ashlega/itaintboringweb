import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  var cache = getCache();
  var url = SiteSettings.USER_EXISTS_URL+"&email="
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  var fullName = searchParams.get('fullName')
  if(!fullName) fullName = ""
  url = url + email
  url += "&fullName="+fullName

  var cacheKey = cache.getUserCacheKey(email);
  var content = await cache.get(cacheKey)
  if(!content)
  {
    const response = await fetch(url, { cache: 'no-cache' })
    content = await response.json()
    await cache.set(cacheKey, content)
  }
  return NextResponse.json( { data: content })
}

