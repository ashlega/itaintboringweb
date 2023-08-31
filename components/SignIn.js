
import { getContent} from "../utils/contentFunctions"

import React, { useState, useEffect } from "react";

import { signIn, getSession, csrfToken } from "next-auth/react";

const  SignIn = ({ providers }) => {
  
  const [ callbackUrl, setCallbackUrl ] = useState();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    setCallbackUrl (queryParameters.get("callbackUrl"));
  }, []);

    return (
      <div className="w-full pt-2 px-6 sm:px-8 lg:px-16 bg-white-300 justify-center text-center user_consent">
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

