import React, { useMemo, useContext } from "react";
import Image from "next/image";
import News from "./News";
import ButtonPrimary from "./misc/ButtonPrimary";
import ButtonOutline from "./misc/ButtonOutline.";
//import Maps from "../public/assets/HugeGlobal.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import ScrollAnimationWrapperSimple from "./Layout/ScrollAnimationWrapperSimple";
import SiteSettings from "../utils/SiteSettings"
import Subscribe from "./Actions/Subscribe.js"
import Contact from "./Actions/Contact.js"
import AppContext from "./Context/AppContext";




const Pricing = ({expandContactForm=false}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const { appState, setAppState } = useContext(AppContext);

  const openContactForm = () => {
    setAppState({...appState, isContactFormOpen : true});
  }
  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed"
            >
              {SiteSettings.pricingHeader}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              {SiteSettings.pricingSubHeader}
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            {SiteSettings.offers.map((offer, index) => (
                <ScrollAnimationWrapperSimple className="flex justify-center" key={offer.title}>
                  <motion.div
                    variants={scrollAnimation}
                    className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                    whileHover={{
                      scale : 1.1,
                      transition: {
                        duration: .2
                      }
                    }}
                  >
                    <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                      <Image
                        src={offer.icon}
                        width={145}
                        height={165}
                        alt={offer.title}
                      />
                    </div>
                    <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                      {offer.title}
                    </p>
                    <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                      {offer.items.map((item) => (
                        <li className="relative check custom-list my-2" key={item}>
                          {item}
                        </li>
                      ))}
                    
                    </ul>
                    <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                      <p className="text-2xl text-black-600 text-center mb-4 ">
                        {offer.terms}
                      </p>
                      <ButtonOutline
                      onClick={openContactForm}
                      >Request</ButtonOutline>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapperSimple>
                )                

            )}
            
            
          </div>
        </div>
        <div className="flex flex-col w-full my-16" id="testimoni">
          {
          /*
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
              {SiteSettings.NewsHeader}{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              {SiteSettings.NewsSubHeader}
              
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <News />
            </motion.div>
          </ScrollAnimationWrapper>
          */
          }
          <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{duration: 3}}>
              <Contact  isOpenInitially={expandContactForm}/>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
        
        
      </div>
    </div>
  );
};

export default Pricing;
