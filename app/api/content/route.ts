import { NextResponse } from 'next/server'
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"
 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const url = SiteSettings.CONTENT_URL+"&name="+name
  var content = await getCache().get(url)
  if(!content){
    const response = await fetch(url, { cache: 'no-cache', next: { tags: ["content" + name] } })
    content = await response.json()
    await getCache().set(url, content)
  }
  return NextResponse.json( { data: content })
}