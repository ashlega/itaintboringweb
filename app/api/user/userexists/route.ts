import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"

 
export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  const response = await fetch(SiteSettings.USER_EXISTS_URL+"&authid="+session?.user?.email, { next: { tags: [session?.user?.email ?? "empty"] } })
  const content = await response.json()
  return NextResponse.json( { data: content })
}

