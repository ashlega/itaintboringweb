import React, { useState, useEffect, useContext} from "react";
import Link from "next/link";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import { signIn, signOut, useSession } from "next-auth/react"
import ProfileMenu from "../Profile/ProfileMenu"
import SiteSettings from "../../utils/SiteSettings"
import { useRouter } from 'next/router'
import AppContext from "../Context/AppContext";



const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  const router = useRouter();

  const { appState, setAppState } = useContext(AppContext);

  const { data: session, status } = useSession()
  const loading = status === "loading"


  const openPage = (e, pageName) => {
    e.preventDefault();
    setActiveLink(pageName);
    if(pageName == "requests"){
        setAppState({...appState, /*selected:"requests", */ isContactFormOpen : false});
        router.push('/requests');
    }
    if(pageName == "home"){
      setAppState({...appState, /*selected:"home",*/ isContactFormOpen : false});
      router.push('/');
    }
    if(pageName == "about"){
      setAppState({...appState, /*selected:"about",*/ isContactFormOpen : false});
      router.push('/about');
    }
    if(pageName == "booking"){
      setAppState({...appState, /*selected:"about",*/ isContactFormOpen : false});
      router.push('/booking');
    }
    if(pageName == "digest"){
      //setAppState({...appState, selected:"digest", isContactFormOpen : false});
      //router.push('/');
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; 
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white-500 transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center  ">
            <Link href="/" 
             onClick={(e) => {
              openPage(e, "home");
             }}
            >
            <img  src="../../assets/treecat/tclogo.png" className="h-14 w-auto" />
            </Link>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e, "home");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "home"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 a")
              }
            >
              
              Home
            </Link>
            
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"requests");
                
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "requests"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 ")
              }
            >
              Questions&nbsp;&amp;&nbsp;Requests
            </Link>


            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"booking");
                
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "booking"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 ")
              }
            >
              Services&nbsp;&amp;&nbsp;Events
            </Link>
            
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"about");
                
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "about"
                  ? " text-orange-500 animation-active "
                  : " text-black-500 hover:text-orange-500 ")
              }
            >
              About
            </Link>
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">

          {!session && (
            <>
              <a
                className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all"
                
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                <ButtonOutline>Sign In</ButtonOutline>
              </a>

              
            </>
          )}

          {session?.user && (
            <>
              <ProfileMenu/>
              
            </>
          )}
            
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"home");
                
              }}
              className={
                "cursor-pointer mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "feature"
                  ? "  border-orange-500 text-orange-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Home
            </Link>
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"requests");
                
              }}
              className={
                "cursor-pointer mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "testimoni"
                  ? "  border-orange-500 text-orange-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Questions&nbsp;&amp;&nbsp;Requests
            </Link>
            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"booking");
                
              }}
              className={
                "cursor-pointer mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "testimoni"
                  ? "  border-orange-500 text-orange-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Services&nbsp;&amp;&nbsp;Events
            </Link>

            <Link
              
              href="#"
              onClick={(e) => {
                openPage(e,"about");
                
              }}
              className={
                "cursor-pointer mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-orange-500 text-orange-500"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </Link>
            
            
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
