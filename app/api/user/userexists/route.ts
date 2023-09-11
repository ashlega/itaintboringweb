import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  var url = SiteSettings.USER_EXISTS_URL+"&authid="
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  var fullName = searchParams.get('fullName')
  if(!fullName) fullName = ""
  url = url + email
  url += "&fullName="+fullName
  var content = await getCache().get(url)
  if(!content)
  {
    const response = await fetch(url, { cache: 'no-cache' })
    content = await response.json()
    await getCache().set(url, content)
  }
  else {
    //console.log("Cached user")
  }
  return NextResponse.json( { data: content })
}

