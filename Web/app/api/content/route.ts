import { NextResponse } from 'next/server'
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"
 
export async function GET(request: Request) 
{
  var cache = getCache();
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const url = process.env.API_CONTENT_URL+"&name="+name
  
  var content = await cache.get(cache.getContentCacheKey(name))
  if(!content){
    const response = await fetch(url, { cache: 'no-cache' })
    content = await response.json()
    await cache.set(name, content)
  }
  return NextResponse.json( { data: content })
}