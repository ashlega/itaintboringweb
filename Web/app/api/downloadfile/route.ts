import { NextResponse } from 'next/server'
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
 
export async function GET(request: Request) 
{
  const { searchParams } = new URL(request.url)
  const objectId = searchParams.get('objectId')
  const objectType = searchParams.get('objectType')
  const fileId = searchParams.get('fileId')

  const session = await getServerSession(authOptions);
  const anySession : any = session;

  const url = process.env.API_FILE_DOWNLOAD_URL+"&fileid="+fileId+"&objectid="+objectId+"&objectyype="+objectType+"&userid="+(anySession?.user?.id ?? "00000000-0000-0000-0000-000000000000") 

  const fetchResponse = await fetch(url, { cache: 'no-cache' })
  var content = await fetchResponse.json()
  if(content.Result){

    const headers = new Headers();
    headers.set("Content-Type", content.Content["$content-type"]);
    headers.set("Content-Disposition", 'attachment; filename="' + encodeURIComponent(content.Name) + '"')
    var buf = Buffer.from(content.Content["$content"],"base64")

    return new NextResponse(buf, { status: 200, statusText: "OK", headers })
  }
  else {
    return NextResponse.json({ error: content.Error }, { status: 401 })
  }

}