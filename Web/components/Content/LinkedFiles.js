
import { getLinkedFiles } from "../../utils/contentFunctions"
import Link from "next/link";

import React, { useState, useEffect, title, useContext   } from "react";

const  LinkedFiles = ({objectId, objectType, className, title, setContentLoaded, defaultContent = null}) => {
  
  const [contentData, setContentData] = useState();
  useEffect(() => {
    getLinkedFiles(objectId, objectType).then((response) => {
      setContentData(response);
      setContentLoaded(true);
    });
  }, []);

    return (
      <>
      {contentData?.Files && contentData?.Files?.length > 0 ? (
        <div
          className={className}
        >
          <h1 className="text-black-600 font-medium text-base">{title}</h1>
          <ul class="list-disc ml-4">
          {contentData.Files.map((file) => (
              <li ><div><a 
                    className="hover:underline underline"
                    target="_blank"
                    href={file.Url}>
                      {file.Title}
                  </a>
                  </div>
                  <div className="mb-2">
                  {file.Description}
                  </div>
              
              </li>
            )
          )}
          </ul>
        </div>
      ):("")}
      </>
    )
  }
  
export default LinkedFiles;
