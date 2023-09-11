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
            <ScrollAnimationWrapperSimple className="flex justify-center">
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
                    src="/assets/Free.png"
                    width={145}
                    height={165}
                    alt="Per Hour Consulting"
                  />
                </div>
                <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                  Per Hour
                </p>
                <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                  <li className="relative check custom-list my-2">
                    No long-term commitment from you 
                  </li>
                  <li className="relative check custom-list my-2">
                    Reduced availability from us
                  </li>
                  <li className="relative check custom-list my-2">
                    Works great for when you need help occasionally
                  </li>
                  <li className="relative check custom-list my-2">
                    40 hours minimum, 10 hours increments after that
                  </li>
                </ul>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p className="text-2xl text-black-600 text-center mb-4 ">
                    $155 USD per hour
                  </p>
                  <ButtonOutline
                  onClick={openContactForm}
                  >Request</ButtonOutline>
                </div>
              </motion.div>
            </ScrollAnimationWrapperSimple>
            <ScrollAnimationWrapperSimple className="flex justify-center">
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
                  src="/assets/Standard.png"
                  width={145}
                  height={165}
                  alt="Standard Plan"
                />
              </div>
              <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                Long term{" "}
              </p>
              <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                <li className="relative check custom-list my-2">
                  Works great for when you can anticipate at least 400 hours of work
                </li>
                <li className="relative check custom-list my-2">
                  Increased availability from us
                </li>
                <li className="relative check custom-list my-2">
                  400 hours min in total to spend 6 months or less with the burn rate of at least 50 hours per month
                </li>
                <li className="relative check custom-list my-2">
                  80 hours increments after the initial 400 hours 
                </li>
                
                
              </ul>
              <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                <p className="text-2xl text-black-600 text-center mb-4 ">
                  $140 USD per hour
                </p>
                <ButtonOutline
                onClick={openContactForm}
                >Request</ButtonOutline>
              </div>
              </motion.div>
            </ScrollAnimationWrapperSimple>
            <ScrollAnimationWrapperSimple className="flex justify-center">
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
                  src="/assets/Premium.png"
                  width={145}
                  height={165}
                  alt="Premium Plan"
                />
              </div>
              <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                Scope & Duration Based{" "}
              </p>
              <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                <li className="relative check custom-list my-2">
                  Let's discuss your project or training requirements
                </li>
                <li className="relative check custom-list my-2">
                  And come up with the duration / estimate
                </li>
                <li className="relative check custom-list my-2">
                  From there, let's see whether we can make you an offer
                </li>
                <li className="relative check custom-list my-2">
                  So we could sign a contract
                </li>
                <li className="relative check custom-list my-2">
                  And complete the work
                </li>
                
              </ul>
              <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                <p className="text-2xl text-black-600 text-center mb-4 ">
                  Scope&Duration based pricing
                </p>

                <ButtonOutline
                onClick={openContactForm}
                >Request</ButtonOutline>
              </div>
              </motion.div>
            </ScrollAnimationWrapperSimple>
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
