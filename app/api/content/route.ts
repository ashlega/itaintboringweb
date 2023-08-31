import { NextResponse } from 'next/server'
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const response = await fetch(SiteSettings.CONTENT_URL+name, { cache: 'force-cache', next: { tags: ["content" + name] } })
  const content = await response.json()
  return NextResponse.json( { data: content })
}