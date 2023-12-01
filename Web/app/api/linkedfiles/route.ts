import { NextResponse } from 'next/server'
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { getCache } from "../../../utils/cache"
import { getServerSession } from "next-auth"
 
export async function GET(request: Request) 
{
  var cache = getCache();
  const { searchParams } = new URL(request.url)
  const objectId = searchParams.get('objectId')
  const objectType = searchParams.get('objectType')

  const session = await getServerSession(authOptions);
  const anySession : any = session;

  const url = process.env.API_FILE_LIST_URL+"&objectid="+objectId+"&objecttype="+objectType+"&userid="+anySession?.user?.id
  
  const cacheKey = cache.getFileListKey(session, objectId, objectType);
  var result = await cache.get(cacheKey)
  if(!result){
    const response = await fetch(url, { cache: 'no-cache' })
    var content = await response.json()
    
    var files : any[] = [];
    content.map((file : any) => 
        {
          files.push({
            Title: file.ita_name,
            Id: file.ita_itafileid,
            DownloadUrl: file.ita_externallink ? null : ("/api/downloadfile?fileId="+file.ita_itafileid+"&objectId="+objectId+"&objectType="+objectType),
            ExternalUrl: file.ita_externallink,
            Description: file.ita_externaldescription
          })
        });
    var result : any = {
      Files: files
    };
    await cache.set(cacheKey, result)
  }

  return NextResponse.json(result)
 
}