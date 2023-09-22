
import { getLinkedFiles, uploadFiles } from "../../utils/contentFunctions"
import Link from "next/link";
import  FileUpload  from "../misc/FileUpload"
import { displayError } from "../../utils/onpageutils"

import React, { useState, useEffect, title, useContext   } from "react";

const  LinkedFiles = ({objectId, objectType, className, title, setContentLoaded, defaultContent = null}) => {
  
  const [contentData, setContentData] = useState();
  const [filesLoaded, setFilesLoaded] = useState(false);


  useEffect(() => {
    reloadLinkedFiles();
  }, []);

  const reloadLinkedFiles = () =>
  {
    getLinkedFiles(objectId, objectType).then((response) => {
      setContentData(response);
      setContentLoaded(true);
      setFilesLoaded(true);
    });
  }

  const onUploadFiles = async (files)=>{
    setContentData([]);
    setContentLoaded(false);
    setFilesLoaded(false);
    uploadFiles(files, objectId, objectType)
    .then((response) => {
      if(response.error){
        displayError(response.error);
        setContentLoaded(true);
        setFilesLoaded(true);
      }
      else {
        reloadLinkedFiles();
      }
      
    })
    .catch((err) =>
    {
      console.log(err);
      setContentLoaded(true);
      setFilesLoaded(true);
    })
    
  }


    return (
      <>
      <div className={"w-full flex pt-4 flex " + (filesLoaded ? "hidden_div" : "")}>
            <div className="mr-4 mt-1"></div>
            <div >
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
              </div>
            </div>
          </div>
          
      {contentData?.Files && contentData?.Files?.length > 0 ? (
        <div
          className={className}
        >
          <div className="flex w-full">
            <div className="mr-4">
              <h1 className="text-black-600 font-medium text-base mt-1">{title}</h1>
            </div>
            <div className="justify-right">
              <FileUpload title="Upload&nbsp;Files" displayPopup={false} onUploadFiles={onUploadFiles}/>
            </div>
          </div>

          

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
