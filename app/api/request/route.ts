import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'
 
export async function POST(req: Request) 
{
  const session = await getServerSession(authOptions);

  const data = await req.json()

  const anySession : any = session;

  if(anySession?.user?.id)
  {

    const response = await fetch(SiteSettings.REQUEST_ADD_URL, {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, userid: anySession?.user?.id}),
    })
    
    revalidateTag(SiteSettings.REQUEST_LIST_TAG+anySession?.user?.id);

    const content = await response.json()

    return NextResponse.json( content )
  }
  else return NextResponse.json( null )

}