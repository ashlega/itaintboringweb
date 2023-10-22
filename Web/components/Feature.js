import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import AppointmentScheduler from "../components/Scheduling/AppointmentScheduler.js"
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SiteSettings from "../utils/SiteSettings";

import { getAvailableTimes} from "../utils/appointmentFunctions.js"



const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);


  const getTimes = async (activeDate) => {
    var options = await getAvailableTimes(activeDate, "freeconsultation", "online");
    return options;
  }

  const bookTime = async (selectedTime) => {
    alert("Selected: " + selectedTime)
  }

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="ml-2 sm:ml-12 ">
         <AppointmentScheduler prefix="general" onGetAvailableTimes={getTimes} onBookTime={bookTime}
            initialDate={new Date()}
          />
      </div>

      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Illustration2.png"
              alt={SiteSettings.defaultAlt}
              layout="responsive"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

        <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            {SiteSettings.servicesHeader}
          </h3>
          <p className="my-2 text-black-500">
            {SiteSettings.servicesSubHeader}
          </p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {SiteSettings.servicesList.map((feature, index) => (
              <motion.li
                className="relative circle-check custom-list"
                custom={{duration: 2 + index}}
                variants={scrollAnimation}
                key={feature}
                whileHover={{
                scale : 1.1,
                transition: {
                  duration: .2
                }
                }}>
                  {feature}
              </motion.li>
              )
            )}
          </ul>
        </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
