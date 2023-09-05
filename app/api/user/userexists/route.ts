import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const url = SiteSettings.USER_EXISTS_URL+"&authid="+session?.user?.email
  var content = await getCache().get(url)
  if(!content)
  {
    const response = await fetch(url, { cache: 'no-cache', next: { tags: [session?.user?.email ?? "empty"] } })
    content = await response.json()
    await getCache().set(url, content)
  }
  return NextResponse.json( { data: content })
}

