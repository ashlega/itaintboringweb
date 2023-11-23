import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import SiteSettings from "../../../utils/SiteSettings"
import { getCache } from "../../../utils/cache"
import { checkUserExists } from "../../../utils/userFunctions"



// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /*
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
     
    GithubProvider({
      //clientId: process.env.GITHUB_ID,
      //clientSecret: process.env.GITHUB_SECRET,
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    */
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      authorization: {
        params: { scope: 'openid profile email' },
      },
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile, tokens) {
        const defaultImage =
          'https://cdn-icons-png.flaticon.com/512/174/174857.png';
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
    })
    /*
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    */
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    async signIn({ user, account, profile, email, credentials }) {
      //const response = await fetch(`https://prod-00.canadacentral.logic.azure.com:443/workflows/ed18c0b33637465db740269ad870e789/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=asGA7A2LunpnUqIh488FH8jFBg2cmYXAsM559SxjhUY&authid=`+user?.email, { next: { tags: [user?.email ?? "empty"] } })
      //const content = await getUser(user?.email)
      //user.id = content.Id;
      return true;
      //const isRegistered = user.hasOwnProperty('emailVerified');
      /*
      const isAllowedToSignIn = false
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
      */
    },
    async session ({ session, user }) {
      var newSession : any = session;
      if (newSession?.user && !newSession?.user?.id) {
        const content = await getUser(session.user?.email, session.user?.name)
        newSession.user.id = content.data.Id;
        newSession.user.subscriptionStatus = content.data.SubscriptionStatus;
        newSession.user.subscriptionStatusName = content.data.SubscriptionStatusName;
        newSession.user.cachePrefix = content.data.CachePrefix;
      }
      return newSession;
    },
  },
}

export async function getUser(email:string | null | undefined, fullName:string | null | undefined) {
    var result = await checkUserExists(email, fullName)
	  return result;
}

export default NextAuth(authOptions)
