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
    var url = SiteSettings.SUBSCRIBE_URL+"&authid="+session?.user?.email
    const response = await fetch(url, { cache: 'no-cache' })
    const content = await response.json()

    const userUrl = SiteSettings.USER_EXISTS_URL+"&authid="+session?.user?.email+"&fullName="+session?.user?.name
    //console.log("Clearing cache: " + userUrl)
    await getCache().del(userUrl)

    return NextResponse.json( { data: content })
  }
}

