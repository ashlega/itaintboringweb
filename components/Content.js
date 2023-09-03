
import { getContent} from "../utils/contentFunctions"

import React, { useState, useEffect,  useContext   } from "react";
import { signIn, signOut, useSession } from "next-auth/react"

const  Content = ({name, className, setContentLoaded, defaultContent = null}) => {
  
  const [contentData, setContentData] = useState({Content: "<center>" + (defaultContent ?? "Loading data...") + "</center>"});

  

  useEffect(() => {
    getContent(name).then((response) => {
      setContentData(response.data);
      setContentLoaded(true);
    });
  }, []);

  

    return (
      <div
        className={className}
      >
        
        <h1 >{contentData?.Title}</h1>
        <span dangerouslySetInnerHTML={{ __html: contentData?.Content }} ></span>

      </div>
    )
  }
  
export default Content;
