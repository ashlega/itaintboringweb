import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"
 
async function testAsync()
{
  return 1;
}

export async function GET(request: Request) 
{
  const session = await getServerSession(authOptions);
  if(!session || !session?.user) return NextResponse.json( "Not authorized");

  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  //var client = await getCache().getClient()
  //if(!client.isOpen) console.log("DISCONNECTED")
  //else console.log("CONNECTED")
  
  var content = await getCache().get(key)
  if(!content){
    console.log("SETTING TEST CONTENT")
    await getCache().set(key, "test", 30000)
  }
  console.log(content)

/*
  return testAsync().then( ()=>{
    return NextResponse.json( { data: "TEST" })
  });*/
  return NextResponse.json( { data: content })
}

