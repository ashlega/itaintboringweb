import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { getCache } from "../../../../utils/cache"
 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  var url = SiteSettings.UNSUBSCRIBE_URL+"&id="+id
  const response = await fetch(url, { cache: 'no-cache' })
  const content = await response.json()

  const session = await getServerSession(authOptions);
  if(session){
    const userUrl = SiteSettings.USER_EXISTS_URL+"&authid="+session?.user?.email+"&fullName="+session?.user?.name
    await getCache().del(userUrl)
  }
  return NextResponse.json( { data: content })
}

