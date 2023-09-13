import { NextResponse } from 'next/server'
import SiteSettings from "../../../utils/SiteSettings"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { getCache } from "../../../utils/cache"

 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const url = SiteSettings.REQUEST_TYPES_URL

  var cache = getCache();

  var content = await cache.get("request_types")
  if(!content){
    const response = await fetch(url, { cache: 'no-cache' })
    content = await response.json()
    await cache.set("request_types", content)
  }
  return NextResponse.json( { data: content })
}