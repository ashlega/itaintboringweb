import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react"




import dynamic from "next/dynamic";
import TWDropdown from "../twcomponents/TWDropdown";
/*
const TestComponent = dynamic(() => import("../components/twcomponents/TestComponent"), {
  ssr: false,
});
*/

const ProfileMenu = () => {
    const [activeLink, setActiveLink] = useState(null);
    const [scrollActive, setScrollActive] = useState(false);
  
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    
    const onSelect = (action) => {
       if(action == "Sign Out"){
        signOut();
       }
    };
  
    return (
      <>
        {session.user.image && (
            <>

            <TWDropdown 
              title={session?.user.name} 
              actions={["Profile","Sign Out"]}
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