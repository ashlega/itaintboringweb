import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, { useState, useEffect, useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import SiteSettings from "../../utils/SiteSettings"




import dynamic from "next/dynamic";
import TWDropdown from "../twcomponents/TWDropdown";
import AppContext from "../Context/AppContext";
/*
const TestComponent = dynamic(() => import("../components/twcomponents/TestComponent"), {
  ssr: false,
});
*/

const ProfileMenu = () => {

    const router = useRouter();

    const [activeLink, setActiveLink] = useState(null);
    const [scrollActive, setScrollActive] = useState(false);
  
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const { appState, setAppState } = useContext(AppContext);

    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    
    const onSelect = (action) => {
       if(action.id == 1){
        //signOut();
        setAppState({...appState, selected:"requests"});
       }
       else if(action.id == 2){
        signOut({ callbackUrl: '/' })
       }
    };
  
    return (
      <>
        {session.user.image && (
            <>

            <TWDropdown 
              title={session?.user.name} 
              actions={[{title: "My Requests", id: 1},{title:"Sign Out", id: 2}]}
              onSelect={onSelect}
            />
   {
    /*
            <span
            style={{ backgroundImage: `url('${session.user.image}')` }}
            className={styles.avatar}
            >
            
            <strong>{session.user.email ?? session.user.name}</strong>
            </span>
   */}
            </>
            )
            
        }
      </>
      );
    };
      
    export default ProfileMenu;