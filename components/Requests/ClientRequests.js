import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import SiteSettings from "../../utils/SiteSettings"
import TWTable from "../twcomponents/TWTable"
import RequestEditor from "./RequestEditor"
import { getRequestList } from "../../utils/requestFunctions"
import { useSession } from "next-auth/react"
import AccessDenied from "../access-denied"
import Toggle from "react-toggle"
import "react-toggle/style.css"

import GridiconExternal from "gridicons/dist/external";



const ClientRequests = ({isVisible}) => {

  const [ dataTable, setDataTable ] = useState(null);
  const [ dataTableElement, setDataTableElement ] = useState(null);

  const [ isEditorMode, setIsEditorMode ] = useState(false);
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ activeOnly, setActiveOnly ] = useState(true);
  const [ selectedRequest, setSelectedRequest ] = useState(null);

  const { data: session } = useSession()
  

  //const requestTypes = getRequestTypes();
//debugger;

  
  const [ requestListData, setRequestListData ] = useState({
    columns: ['Request #', 'Subject', 'Status', 'Action'],
    rows: [   
    ],
    loading: false,
    perPage: 10
  });

  const openRequest = (id) =>
  {
    alert(id);
  }
/*
  useEffect(() =>{
    if(!dataTable || !requestListData) return;
    dataTable.update(requestListData, { loading: requestListData.loading });
    dataTable.sort(requestListData.columns[0], "desc");
  }, [requestListData, dataTable])
*/
  useEffect( () => {
    const init = async () => {
      const { Datatable , Input, initTE } = await import("tw-elements");
      initTE({ Datatable , Input });
      const dte = document.getElementById('datatable_request_list');
      setDataTableElement(dte);
      dte.innerHTML = "";
      var dt = new Datatable(dte, requestListData, { loading: false, noFoundMessage: "No data found." });
      dt.sort(requestListData.columns[0], "desc");
      setDataTable(dt);
    };
    init();
  }, []);
/*
  useEffect( () => {
    if(selectedRequest)  alert(selectedRequest);
  }, [selectedRequest]);
*/

  const addDataTableActions = () => {
    document.querySelectorAll(".req-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        var selectedRequest = requestListData.rows.find((x) => x.request.id == btn.id)
        setSelectedRequest(selectedRequest)
        setIsEditorMode(true)
      });
    });
  }

  useEffect( () => {
    if(dataTable && requestListData) {
      dataTableElement.addEventListener("render.te.datatable", addDataTableActions);
      dataTable.update(requestListData, { loading: requestListData.loading, entries: requestListData.perPage});
    }
  }, [requestListData])

  const createRequestRow = (request) => {
    var row = [];
    row.push(request.name);
    row.push(request.subject);
    row.push(request.status_name);
    row.push(
        `
      <button
        id='${request.id}'
        type="button"
        data-te-ripple-init
        data-te-ripple-color="dark"
        
        class="req-btn inline-block rounded-full border border-primary p-1.5 mr-1 uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3B71CA" class="w-4 h-4">
            <path d="M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z"/>
        </svg>
        
      </button>
      
      `

    )
    row.request = request;
    return row;
  }

  useEffect( () => {
    //Scroll top top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [isEditorMode])

  useEffect( () => {

    //const loadRequestsData = (Datatable) =>
    //{
      if(!session ) {
        //Cleanup if needed
        if(requestListData && requestListData.rows.length > 0) setRequestListData({...requestListData, rows: [], loading: false});
        if(dataLoaded) setDataLoaded(false);
        return;
      }

      if(!isVisible || isEditorMode) {
        //if(dataTable) setDataTable(null);
        return;
      }

      /*
      if(!dataTable){
        const dataTableElement = document.getElementById('datatable_request_list');
        var updatedReqListData = {
          ...requestListData, 
          rows: dataLoaded ? requestListData.rows : [],
          loading: !dataLoaded
        };

        setRequestListData(updatedReqListData)
        var dt = new Datatable(dataTableElement, updatedReqListData, { loading: updatedReqListData.loading, noFoundMessage: "No data found." });
        
        dt.sort(updatedReqListData.columns[0], "desc");
        setDataTable(dt);
        return;
        //setDataLoaded(false);
        //return;
      }
      */

      if(dataLoaded) return;

      /*
      var dt = dataTable;
      if(!dt){
        const dataTableElement = document.getElementById('datatable_request_list');
        var dt = new Datatable(dataTableElement, requestListData, { loading: true, noFoundMessage: "No data found." });
        setDataTable(dt);
      }
      else{
        var reqListData = {columns: ['Request #', 'Subject', 'Status'], rows: []};
        dt.update(reqListData, { loading: true });
      }
      */
      //if(!dataLoaded){
        //var reqListData = {columns: ['Request #', 'Subject', 'Status'], rows: []};
        var startEntries = dataTable?._options?.entries ?? 10; 

        //dataTable.update({...requestListData, rows: []}, { loading: true, perPage: startEntries });
        setRequestListData({...requestListData, rows: [], loading: true, perPage: startEntries })

        getRequestList(activeOnly).then((data) =>
        {
          var requestList = [];
          if(data?.data){
            data.data.map((request) =>
            {
              requestList.push(createRequestRow(request));
            })
            var reqListData = {columns: ['Request #', 'Subject', 'Status', 'Action'], rows: requestList, loading: false, perPage: startEntries};
            setRequestListData(reqListData)
            setDataLoaded(true)
          }
        });
      //}
      
    
    /*
    if(session && !dataTable)
    {
      const init = async () => {
        const { Datatable , Input, initTE } = await import("tw-elements");
        initTE({ Datatable , Input });
        
        loadRequestsData(Datatable);
      };
      init();
    }
    else 
    
    if(session && dataTable)
    {
      loadRequestsData();
    }
    */
  }, [session, isVisible, dataTable, isEditorMode, activeOnly]);

  

  const reloadRequests = (addedRequest) =>{
    if(addedRequest){
      requestListData.rows.push(createRequestRow(addedRequest));
      setRequestListData({...requestListData});
    }
    else{
      setDataLoaded(false);
    }
  }

  return (
    <>
    
    {!session && isVisible ? (
      <AccessDenied />
    ) : ("")}
       <span className={isVisible && session && isEditorMode ? "" : "hidden_div"}>
        <RequestEditor setIsEditorMode={setIsEditorMode} reloadRequests={reloadRequests} request={ selectedRequest ? 
          {
            isNew: false, 
            current: selectedRequest.request
          } : {isNew: true, current: null}}/>
      </span>

        <span className={isVisible && session && !isEditorMode ? "" : "hidden_div"}>
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
