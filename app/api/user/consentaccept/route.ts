import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  if(!session){

    return NextResponse.json({ error: 'Please make sure you have logged in before attempting this action' }, { status: 401 })

  }
  else{
    const response = await fetch(SiteSettings.CONSENT_ACCEPT_URL+"&authid="+session?.user?.email, { next: { tags: [session?.user?.email ?? "empty"] } })
    const content = await response.json()
    return NextResponse.json( { data: content })
  }
}

