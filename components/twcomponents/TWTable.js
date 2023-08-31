"use client";
import { useEffect, useState } from "react";



const TWTable = ({ getData }) => {
  

  const [ dataTableComponent, setDataTableComponent ] = useState(null);
  const [ dataTableElement, setDataTableElement ] = useState();
  const [ dataTable, setDataTable ] = useState(null);
  //const { title = "test", actions, onselect } = props;
  //const [ basicData ] = useState(tableData);
  /*
  const basicData = {
    columns: ['Request #', 'Subject', 'Submitted On', 'Last Updated On', 'Status'],
    rows: [
      ["00001000", "System Architect", "2011/04/25", "2011/04/25", "$320,800"],
      ["00001001", "Accountant", "2011/07/25", "2011/07/25","$170,750"],
      ["00001002", "Junior Technical Author", "2009/01/12", "2009/01/12","$86,000"],
      
    ],
  };*/


  useEffect(() => {
    const init = async () => {
      const { Datatable , Input, initTE } = await import("tw-elements");
      initTE({ Datatable , Input });
      
      setDataTableElement( 
        document.getElementById('datatable_request_list')
      );
      setDataTableComponent({
        dataTableConstructor: Datatable}
      );
    };
    init();
  }, []);

  useEffect(() => {
    if(dataTableComponent && tableData){
      if(!dataTable)
      {
        var dt = new dataTableComponent.dataTableConstructor(dataTableElement, tableData, { loading: false, noFoundMessage: "Loading..." });
        dt.sort(tableData.columns[0],  "desc");
        setDataTable(dt);
      }
      else{
        debugger;
        dataTable.update(tableData, { loading: false, noFoundMessage: "Loading..." });
        dataTable.sort(tableData.columns[0], "desc");
      }
    }
  }, [dataTableComponent, tableData]);

  return (
    <div
        id="datatable_request_list"
        
        data-te-fixed-header="false"></div>
  );
};

export default TWTable;