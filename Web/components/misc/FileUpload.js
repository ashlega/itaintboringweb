import React, { useState } from 'react';
import ButtonOnPage  from './ButtonOnPage';


const FileUpload = ({title, displayPopup=true, onUploadFiles=null}) => {
    const [content, setContent] = useState(null);
    const [files, setFiles] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    
    
    const uploadToClient = async (event) => {
      if (event.target.files ) {
        var tmpFiles = [...files];
        for(let i=0; i<event.target.files.length; i++){
            tmpFiles.push(event.target.files[i]);
        }
        
        if(!displayPopup){
            if(onUploadFiles) onUploadFiles(tmpFiles);
            setFiles([]);
        }
        else{
            setFiles(tmpFiles);
        }
        //setContent(fl);
        //setCreateObjectURL(URL.createObjectURL(fl));
      }
    };
  
    
    const openFileBrowser = () => {
        
        document.getElementById(title & "fileUpload").click()
    }
  //<a href={createObjectURL}>File</a>
    return (
      

        <>
        <ButtonOnPage
          onClick={() => {if(displayPopup) {setFiles([]); setShowModal(true)} else openFileBrowser()}}
        >{title}</ButtonOnPage>
        <input type="file" name="myFile" id={title & "fileUpload"} multiple={true} onChange={uploadToClient} className="hidden" />
        {showModal && displayPopup ? (
        <>
        
            <div className="flex justify-center mx-6 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-1 border-solid border-gray-300 rounded-lg shadow-lg relative flex flex-col w-full bg-white  outline focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                            <h3 className="text-2xl font=semibold">Choose Files to Upload</h3>
                            
                        </div>
                        <div className="relative p-2 flex-auto">
                            <div>
                                <div>
                                <ButtonOnPage
                                onClick={openFileBrowser}
                                >Browse...</ButtonOnPage>
                                <ul className="mt-2">
                                    {files.map((fl) => (
                                        <li>{fl.name}</li>
                                    ))}
                                </ul>
                                
                                
                                </div>
                            </div>
            

                            
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <ButtonOnPage

                            onClick={() => setShowModal(false)}
                            >
                            Cancel
                            </ButtonOnPage>
                            <ButtonOnPage

                            onClick={() => {if(onUploadFiles) onUploadFiles(files); setShowModal(false)}}
                            >
                            Submit
                            </ButtonOnPage>
                        </div>
                    </div>
                </div>
            </div>
        </>
        ) : null}
        </>
    );
  }

  export default FileUpload;