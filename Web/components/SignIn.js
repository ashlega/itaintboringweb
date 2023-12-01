
import { getContent} from "../utils/contentFunctions"

import React, { useState, useEffect } from "react";

import { signIn, getSession, csrfToken, useSession } from "next-auth/react";

const  SignIn = ({ providers }) => {
  
  const [ callbackUrl, setCallbackUrl ] = useState();
  const {data: session, update: sessionUpdate, status} = useSession()

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    setCallbackUrl (queryParameters.get("callbackUrl"));
    if(session?.user?.id && queryParameters.get("callbackUrl")){
      window.location = queryParameters.get("callbackUrl");
    }
  });

    return (
      <div className="w-full mt-24 pt-6 px-6 sm:px-8 lg:px-16 bg-white-300 justify-center text-center user-consent">
        <h1 >You can sign in with:</h1>
        {Object.values(providers).map((provider) => {
          return (
            

              <button 
                key={provider.name}
                className="font-medium tracking-wide mx-2 py-1 px-2 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
                onClick={() => signIn(provider.id, {callbackUrl: callbackUrl} )}
              >
                {provider.name}
              </button>

          );
        })}
      </div>
    )
  }


 
export default SignIn;

