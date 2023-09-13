import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="lg:row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <div className="flex">
           
            <img src="../../assets/lightning.svg" className="ml-1 mt-1 h-4 w-4 break-after-avoid mr-1" fill="red"/>
            <p className=" w-full mb-4 justify-left font-medium">
            Treecat&nbsp;Software&nbsp;Inc&nbsp;-&nbsp;boosting your power
            </p>
          </div>
          
          <p className="text-gray-400">©{new Date().getFullYear()} - Treecat Software Inc</p>
        </div>
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg footer-title">Power Platform</p>
          <ul className="text-black-500 ">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <Link href="https://powerapps.microsoft.com/en-us/pricing/" target="_blank">Pricing</Link>
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <Link href="https://learn.microsoft.com/en-us/power-apps/" target="_blank">Learning Portal</Link>
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <Link href="https://learn.microsoft.com/en-us/certifications/browse/?terms=power%20platform" target="_blank">Certifications</Link>
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4  font-medium text-lg  footer-title">Other Links</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <Link href="https://www.xrmtoolbox.com/" target="_blank">XrmToolBox</Link>
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            <Link href="https://www.itaintboring.com/businessrulesadmin/" target="_blank">ITA Business Rules</Link>
            </li>
            
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg  footer-title">Events</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Coming soon...
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
