import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"


import { getCache } from "../../../utils/cache"
 

export async function POST(req: Request) 
{
  var cache = getCache();
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  if(!anySession?.user?.id){
    return NextResponse.json({ result: "failed", error: "Please sign in before uploading the files" }, { status: 500 })
  }
  const data = await req.json()
  
  var objectId = data.objectId
  var objectType = data.objectType
  if(!objectId){
    return NextResponse.json({ result: "failed", error: "Cannot upload unlinked files" }, { status: 500 })
  }
  if(!objectType){
    return NextResponse.json({ result: "failed", error: "Cannot upload untyped files" }, { status: 500 })
  }
  

  for (const fileData of data.files) {
    
      var ind = fileData.content.indexOf(",");
      const response = await fetch(process.env.API_FILE_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          objectid : objectId,
          objecttype: objectType,
          userid: anySession?.user?.id,
          filename: fileData.name,
          filedata: ind > 0 ? fileData.content.substring(ind+1) : fileData.content 
        }),
      })
      const responseData = await response.json()
      console.log("Uploaded " + fileData.name);
    }
    
  const cacheKey = cache.getFileListKey(objectId, objectType);
  await cache.del(cacheKey)

  return  NextResponse.json( { result: "ok" } );
  

}
/*
export async function POSTOld(req: Request) 
{
  var cache = getCache();
  const session = await getServerSession(authOptions);
  const anySession : any = session;
  if(!anySession?.user?.id){
    return NextResponse.json({ result: "failed", error: "Please sign in before uploading the files" }, { status: 500 })
  }
  const formData = await req.formData()
  var objectId = formData.get("objectId") as unknown as string
  var objectType = formData.get("objectType") as unknown as string
  if(!objectId){
    return NextResponse.json({ result: "failed", error: "Cannot upload unlinked files" }, { status: 500 })
  }
  if(!objectType){
    return NextResponse.json({ result: "failed", error: "Cannot upload untyped files" }, { status: 500 })
  }
  

  for (const key of formData.keys()) {
    
    if(key.startsWith("file")){
      const file: File | null = formData.get(key) as unknown as File
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const response = await fetch(process.env.API_FILE_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          objectid : objectId,
          objecttype: objectType,
          userid: anySession?.user?.id,
          filename: file.name,
          filedata: buffer.toString() 
        }),
      })
      const responseData = await response.json()
      console.log("Uploaded " + file.name + " Length " + buffer.length + responseData);
    }
    
  }

  const cacheKey = cache.getFileListKey(objectId, objectType);
  //await cache.del(cacheKey)

  return  NextResponse.json( { result: "ok" } );
  

}
*/