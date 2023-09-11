import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const admin_key = searchParams.get('admin_key')
  const email = searchParams.get('email')
  


  if(admin_key != SiteSettings.ADMIN_KEY){
    return NextResponse.json({ error: 'Incorrect admin key' }, { status: 401 })
  }
  var cache = getCache();
  var cacheKey = cache.getUserCacheKey(email);
  await cache.del(cacheKey)
  return NextResponse.json("OK")
}