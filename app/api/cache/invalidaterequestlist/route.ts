import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../../utils/SiteSettings"
import { revalidateTag } from 'next/cache'


export async function GET(req: Request) 
{
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  if(anySession?.user?.id)
  {
    revalidateTag(SiteSettings.REQUEST_LIST_TAG+anySession?.user?.id);
  }
  return NextResponse.json("OK")
}