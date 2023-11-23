import dynamic from "next/dynamic"

import GridiconAddImage from "gridicons/dist/add-image";
import GridiconLocation from "gridicons/dist/location";
import GridiconUser from "gridicons/dist/user";
import GridiconComputer from "gridicons/dist/computer";


//import SiteSettings as SiteSettingsLocal from "./SiteSettings.Local.js"

var SiteSettingsLocal = null



//import SiteSettingsLocal from "./SiteSettings.Local.js"
//const SiteSettingsLocal = undefined

export default class SiteSettings {

    static SUPPORT_GENERIC_NICKNAME = SiteSettingsLocal ? SiteSettingsLocal.SUPPORT_GENERIC_NICKNAME : "It Aint Boring" 
    static CLIENT_GENERIC_NAME_COMMENTS = SiteSettingsLocal ? SiteSettingsLocal.CLIENT_GENERIC_NAME_COMMENTS : "You"

    static iconComponentFill = SiteSettingsLocal ? SiteSettingsLocal.iconComponentFill : "red"
    static title  = SiteSettingsLocal ? SiteSettingsLocal.title : "It Aint Boring"
    static topHeader  = SiteSettingsLocal ? SiteSettingsLocal.topHeader : "Let us talk Power Platform"
    static companyName  = SiteSettingsLocal ? SiteSettingsLocal.companyName : "It Aint Boring"
    static shortCompanyName  = SiteSettingsLocal ? SiteSettingsLocal.shortCompanyName : "ItAintBoring"
    static shortPitch  = SiteSettingsLocal ? SiteSettingsLocal.shortPitch : "All the non-boring stuff about Power Platform and more!"

    static servicesHeader = SiteSettingsLocal ? SiteSettingsLocal.servicesHeader : "Here is what you can find here"
    static servicesSubHeader = SiteSettingsLocal ? SiteSettingsLocal.servicesSubHeader : "Feel free to reach out to know more - drop me a note and I'll do my best to get back to you ASAP!"
    static servicesHeaderAbout = SiteSettingsLocal ? SiteSettingsLocal.servicesHeaderAbout : "What is ItAintBoring?"
    static servicesSubHeaderAbout = SiteSettingsLocal ? SiteSettingsLocal.servicesSubHeaderAbout : "It's a blog by Alex Shlega!"
    static servicesListHeaderAbout = SiteSettingsLocal ? SiteSettingsLocal.servicesListHeaderAbout : "Here is what we do"
    
    static pricingHeader = SiteSettingsLocal ? SiteSettingsLocal.pricingHeader : "Our Activities"
    static pricingSubHeader = SiteSettingsLocal ? SiteSettingsLocal.pricingSubHeader : "We have prepared a few sample offers just to give you an idea of what's possible"
    
    static NewsHeader = SiteSettingsLocal ? SiteSettingsLocal.NewsHeader : "Power Platform News and Events"  
    static NewsSubHeader = SiteSettingsLocal ? SiteSettingsLocal.NewsSubHeader : "For better or worse, Power Platform is always evolving. We hope you will find our Power Platform news digest useful"

    static SubscribeHeader = SiteSettingsLocal ? SiteSettingsLocal.SubscribeHeader : "Subscribe Now!"
    static SubscribeSubHeader = SiteSettingsLocal ? SiteSettingsLocal.SubscribeSubHeader : "We can send Power Platform weekly news right to your inbox every week! You don't need to do a thing... well, other than to make sure those emails don't go to your junk folder!"

    //SEO
    static Title = SiteSettingsLocal ? SiteSettingsLocal.Title : "It Aint Boring"
    static Author = SiteSettingsLocal ? SiteSettingsLocal.Author : "Alex Shlega"
    static SiteName = SiteSettingsLocal ? SiteSettingsLocal.SiteName : "It Aint Boring"
    static Description = SiteSettingsLocal ? SiteSettingsLocal.Description : "Let's talk Power Platform!"

    static defaultAlt = SiteSettingsLocal ? SiteSettingsLocal.defaultAlt : "It Aint Boring"  

    static footerSlogan=SiteSettingsLocal ? SiteSettingsLocal.footerSlogan : "It Aint Boring - where some cool Power Platform stuff lives"
    static servicesAndEventsHeader = "Services & Events"
    static bookedServicesAndEventsHeader = "Your Bookings"
    static ErrorMessageTitle = "Error"
    static ConfirmationMessageTitle = "Confirmation"
    static BookingCancelled = "Your booking has been cancelled"
    static BookingConfirmed = "Your booking has been confirmed"
    static NoBookingsMessage = "You have no bookings to show here yet!"
    static bookingDetailsHeader = "Your Booking"
    static BookingAdditionalDetailsHeader = "Additional Details and Joining Instructions"
    

    static highlightsList  =SiteSettingsLocal ? SiteSettingsLocal.highlightsList :  [
      {
        description: "1000",
        title: "Users",
        iconComponent:  "GridiconUser",
        icon: "/assets/Icon/heroicons_sm-user.svg"
      },
      {
        description: "1000",
        title: "Posts",
        iconComponent: "GridiconLocation",
        icon: "/assets/Icon/gridicons_location.svg"
      },
      {
        description: "Power Platform, D365",
        title: "Topics",
        iconComponent: "GridiconComputer",
        icon: "/assets/Icon/bx_bxs-server.svg"
      }];
    
    static listNews = SiteSettingsLocal ? SiteSettingsLocal.listNews :  [
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing"
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing"
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing"
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing"
      }
    ];
    static servicesList = SiteSettingsLocal ? SiteSettingsLocal.servicesList :  [
      "Power Apps and Power Automate Blogging",
      "Power Apps and Power Automate Discssions"
    ]
    static offers = SiteSettingsLocal ? SiteSettingsLocal.offers : [
      {
        icon: "/assets/Free.png",
        title:"First",
        items:[
         "Best material only",
         "High qality samples",
         "Not some boring stuff"
        ],
        terms:"Free"
      },
      {
        icon: "/assets/Standard.png",
        title:"Second",
        items:[
         "Best material only",
         "High qality samples",
         "Not some boring stuff"
        ],
        terms:"Free"
      },
      {
        icon: "/assets/Premium.png",
        title:"Third",
        items:[
         "Best material only",
         "High qality samples",
         "Not some boring stuff"
        ],
        terms:"Free"
      }
   ]
};


  
  