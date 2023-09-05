import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  if(!session){
    return NextResponse.json({ error: 'Please make sure you have logged in before attempting this action' }, { status: 401 })
  }
  else{
    const response = await fetch(SiteSettings.CONSENT_ACCEPT_URL+"&authid="+session?.user?.email, { next: { tags: [session?.user?.email ?? "empty"] } })
    const content = await response.json()

    const url = SiteSettings.USER_EXISTS_URL+"&authid="+session?.user?.email
    await getCache().del(url)

    return NextResponse.json( { data: content })
  }
}

