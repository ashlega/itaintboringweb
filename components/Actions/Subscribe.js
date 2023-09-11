import React, { useMemo } from "react";
import ButtonPrimary from "../misc/ButtonPrimary";
import ButtonOutline from "../misc/ButtonOutline.";
import SiteSettings from "../../utils/SiteSettings"

const Subscribe = () => {

  return (
    <>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    {SiteSettings.SubscribeHeader}
                  </h5>
                  <p>{SiteSettings.SubscribeSubHeader}</p>
                </div>
                <ButtonPrimary>Subscribe</ButtonPrimary>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
                >

                </div>
    </>      
  );
};

export default Subscribe;