// This is an example of to protect an API route
import  ClientOAuth2 from "client-oauth2"
import { authOptions } from "../auth/[...nextauth]"

import type { NextApiRequest, NextApiResponse } from "next"

var dataverseAuth = new ClientOAuth2({
  //secreitid: '3a09b5c1-a6a4-4e73-ac32-867d87e4dc39'
  clientId: 'e765e807-3415-4af7-bd3e-897d84df549f',
  clientSecret: 'SIC8Q~sZO.L1POYNHcLp4Rj73QXccGvpIxhohaSC',
  accessTokenUri: 'https://github.com/login/oauth/access_token',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://example.com/auth/github/callback',
  scopes: ['notifications', 'gist']
})

export default async function getAcconts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)


    return res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  

 
}
