import { NextResponse } from 'next/server'
import SiteSettings from "../../../utils/SiteSettings"
//import { authOptions } from "../../../pages/api/auth/[...nextauth]"

 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const response = await fetch(SiteSettings.REQUEST_TYPES_URL, { cache: 'force-cache', next: { tags: ["requesttypes"] } })
  const content = await response.json()
  return NextResponse.json( { data: content })
}