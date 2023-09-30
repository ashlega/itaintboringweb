import React, { useMemo, useState, useEffect, useContext } from "react";
import Image from "next/image";
import SiteSettings from "../../utils/SiteSettings"
import TWTable from "../twcomponents/TWTable"
import RequestEditor from "./RequestEditor"
import { getRequestList } from "../../utils/requestFunctions"
import { useSession } from "next-auth/react"
import AccessDenied from "../access-denied"
import Toggle from "react-toggle"
import AppContext from "../Context/AppContext";
import "react-toggle/style.css"

import GridiconExternal from "gridicons/dist/external";



const ClientRequests = ({isVisible}) => {

  const { appState, setAppState } = useContext(AppContext);
  const [ dataTable, setDataTable ] = useState(null);
  const [ dataTableElement, setDataTableElement ] = useState(null);

  const [ isEditorMode, setIsEditorMode ] = useState(false);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ activeOnly, setActiveOnly ] = useState(true);
  const [ selectedRequest, setSelectedRequest ] = useState(null);

  

  const { data: session } = useSession()
  
  const formatCell = (cell, value) => {
    //if(activeOnly )
    if(!activeOnly)
      if(value.row[3].value != "Active" ){
        cell.classList.add("inactive_request");
      }
  };

  //const requestTypes = getRequestTypes();
//debugger;
  const colums = [{label: '', field: 'EmptyField', width: 60, sort: false, format: formatCell},
                  {label: 'Request&nbsp;#', field: 'name', format: formatCell},
                  {label: 'Subject', field: 'subject', format: formatCell}, 
                  {label: 'Status', field: 'status_name', format: formatCell}]
  
  const [ requestListData, setRequestListData ] = useState({
    columns: colums,
    rows: [   
    ],
    loading: false,
    perPage: 10
  });

  class RequestRow {
    constructor(value, row) {
      this.value = value;
      this.row = row;
    }
    toString()
    {
      return this.value;
    }
  }
 
/*
  useEffect(() =>{
    if(!dataTable || !requestListData) return;
    dataTable.update(requestListData, { loading: requestListData.loading });
    dataTable.sort(requestListData.columns[0], "desc");
  }, [requestListData, dataTable])
*/
  useEffect( () => {
    //Scroll top top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [isEditorMode])

  useEffect( () => {
    //if(!isVisible) return;
    const init = async () => {
      const { Datatable , Input, initTE } = await import("tw-elements");
      initTE({ Datatable , Input });
      const dte = document.getElementById('datatable_request_list');
      setDataTableElement(dte);
      dte.innerHTML = "";
      var dt = new Datatable(dte, requestListData, { pagination:true, loading: false, noFoundMessage: "No data found." });
      dt.sort(requestListData.columns[1], "desc");
      setDataTable(dt);
    };
    init();
  }, []);

  useEffect( () => {
    if(dataTable && requestListData) {
      dataTableElement.addEventListener("render.te.datatable", addDataTableActions);
      dataTable.update(requestListData, { pagination:true, loading: requestListData.loading, entries: requestListData.perPage, sortOrder : "desc"});
    }
  }, [requestListData])

  

  useEffect( () => {
      if(!session ) {
        //Cleanup if needed
        if(requestListData && requestListData.rows.length > 0) setRequestListData({...requestListData, rows: [], loading: false});
        if(dataLoaded) setDataLoaded(false);
        return;
      }

      if(!isVisible && isEditorMode) {
        setIsEditorMode(false);
        
      }


      if(!isVisible || isEditorMode) {
        //if(dataTable) setDataTable(null);
        return;
      }


      if(dataLoaded && !appState.reloadRequestList) return;

      
        var startEntries = dataTable?._options?.entries ?? 10; 

        setAppState({...appState, reloadRequestList: false});
        setRequestListData({...requestListData, rows: [], loading: true, perPage: startEntries })

        getRequestList(activeOnly).then((data) =>
        {
          var requestList = [];
          if(data?.data){
            data.data.map((request) =>
            {
              requestList.push(createRequestRow(request));
            })
            var reqListData = {columns: colums, rows: requestList, loading: false, perPage: startEntries};
            setRequestListData(reqListData)
            setDataLoaded(true)
          }
        });
  }, [session, isVisible, dataTable, isEditorMode, activeOnly, appState.reloadRequestList]);

  


  const addDataTableActions = () => {
    document.querySelectorAll(".req-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        var selectedRequest = requestListData.rows.find((x) => x.request.id == btn.id)
        setSelectedRequest(selectedRequest)
        setIsEditorMode(true)
      });
    });
  }

  

  const createRequestRow = (request) => {
    var row = [];
    row.push(
      new RequestRow(
      `
    <button
      id='${request.id}'
      type="button"
      data-te-ripple-init
      data-te-ripple-color="dark"
      
      class="req-btn inline-block rounded-full border border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="#3B71CA" class="w-4 h-4">
          <path d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z"/>
      </svg>
      
    </button>
    
    `,
    row)

    );

    row.push(new RequestRow(request.name, row));
    row.push(new RequestRow(request.subject, row));
    row.push(new RequestRow(request.status_name, row));
    
    row.request = request;
    return row;
  }

  

  const reloadRequests = (addedRequest) =>{
    if(addedRequest){
      requestListData.rows.push(createRequestRow(addedRequest));
      setRequestListData({...requestListData});
    }
    else{
      setDataLoaded(false);
    }
  }
/*
request={ selectedRequest ? 
          {
            isNew: false, 
            current: selectedRequest.request
          } : {isNew: true, current: null}}
*/
//className={isVisible && session && isEditorMode ? "" : "hidden_div"}
  return (
    
    <>
      
         
          {isEditorMode? (
            <RequestEditor setIsEditorMode={setIsEditorMode} reloadRequests={reloadRequests} request={ selectedRequest ? 
              {
                isNew: false, 
                current: selectedRequest.request
              } : {isNew: true, current: null}}/>
          ) : ("")}

          <span className={isVisible && !isEditorMode ? "" : "hidden_div"}>
            <div className="mt-24 px-6 sm:px-8 lg:px-16 mx-auto pb-2 max-w-screen-xl text-left pageHeader flex">
              
              
                <div>
                <b>Your Questions and Requests</b>
                </div>
                <div className="request_buttons ">
                          <button 
                            className="font-medium tracking-wide mx-2 py-1 px-2 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange "
                            onClick={() => {setSelectedRequest(null); setIsEditorMode(true);}}
                          >
                            New Request
                          </button>
                </div> 
            </div>
            
            
            
            <div className={"px-6 sm:px-8 lg:px-16 mx-auto pb-2 max-w-screen-xl text-left " }
            >
            

            <label className="request-filter-label">
              <div className="flex">
                <div>
              <Toggle
                
                defaultChecked={activeOnly}
                onChange={(e)=>{setDataLoaded(false); setActiveOnly(e.target.checked);}}
                />
                </div>
                <div className="px-2">Active Only</div>
              </div>
            </label>
            
            
              <div 
                    id="datatable_request_list"
                    data-te-fixed-header="false"></div>
            
            </div>
          </span>
      
      </>
    
  );
};

export default ClientRequests;
