import GridiconAddImage from "gridicons/dist/add-image";
import GridiconLocation from "gridicons/dist/location";
import GridiconUser from "gridicons/dist/user";
import GridiconComputer from "gridicons/dist/computer";

export default class SiteSettings {
    static iconComponentFill = "red";
    static title  = "Treecat Software Inc";
    static topHeader  = "Power Platform is better with";
    static companyName  = "Treecat Software Inc";
    static shortCompanyName  = "Treecat";
    static shortPitch  = "We provide targetted consulting and training services to the Canadian and US clients out of our Ottawa location";
    
    static servicesHeader = "Here is what we can do for you"
    static servicesSubHeader = "Feel free to reach out to us to know more - drop us a note and we'll do our best to get back to you ASAP!"
    
    static servicesHeaderAbout = "Who are we?"
    static servicesSubHeaderAbout = "We are Treecat! Please feel free to reach out to us to know more - it seems we've been working on the projects a little too hard, and we may have forgotten to set up a contact center, but just drop us a note and we'll do our best to get back to you ASAP!"
    static servicesListHeaderAbout = "Here is what we do"
    
    static pricingHeader = "Our Offers"
    static pricingSubHeader = "We have prepared a few sample offers just to give you an idea of what's possible"
    
    static NewsHeader = "Power Platform News and Events";
    static NewsSubHeader = "For better or worse, Power Platform is always evolving. We hope you will find our Power Platform news digest useful";

    static SubscribeHeader = "Subscribe Now!"
    static SubscribeSubHeader = "We can send Power Platform weekly news right to your inbox every week! You don't need to do a thing... well, other than to make sure those emails don't go to your junk folder!"

    //SEO
    static Title = "Treecat Software Inc"
    static Author = "Alex Shlega"
    static SiteName = "Treecat Softwre Inc"
    static Description = "Treecat Software Inc - Power Platform is better with Treecat!"

    static defaultAlt = "Treecat Software Inc"


    static highlightsList  = [
      {
        description: "5",
        title: "Team Members",
        iconComponent:  GridiconUser,
        icon: "/assets/Icon/heroicons_sm-user.svg",
      },
      {
        description: "Ottawa, ON",
        title: "Location",
        iconComponent: GridiconLocation,
        icon: "/assets/Icon/gridicons_location.svg",
      },
      {
        description: "Power Platform Architects, MVP-s, Developers",
        title: "Skills and Certifications",
        iconComponent: GridiconComputer,
        icon: "/assets/Icon/bx_bxs-server.svg",
      },
    ]  

    static listNews = [
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing",
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing",
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing",
      },
      {
        title: "August 13, 2023",
        image: "/assets/people-3.png",
        city: "Warsaw",
        country: "Poland",
        rating: "4.5",
        details:
          "New Power Automate Licensing, New Power Automate Licensing, New Power Automate Licensing",
      },
    ]

    static servicesList = [
      "Power Apps and Power Automate Consulting",
      "Power Apps and Power Automate Training",
      "Power Platform Project Assessment",
      "Power Platform Solution Design and Architecture"
    ]

    static USER_REQESTS = "/";

    //Flow Urls
    static USER_EXISTS_URL = process.env.API_USER_EXISTS_URL ?? ""
    static CONSENT_ACCEPT_URL = process.env.API_CONSENT_ACCEPT_URL ?? ""
    static REQUEST_ADD_URL = process.env.API_REQUEST_ADD_URL ?? ""
    static REQUEST_LIST_URL = process.env.API_REQUEST_LIST_URL ?? ""
    static REQUEST_TYPES_URL = process.env.API_REQUEST_TYPES_URL ?? ""
    static CONTENT_URL = process.env.API_CONTENT_URL ?? ""
    static COMMENT_LIST_URL = process.env.API_COMMENT_LIST_URL ?? ""
    static COMMENT_ADD_URL = process.env.API_COMMENT_ADD_URL ?? ""
    static SUBSCRIBE_URL = process.env.API_SUBSCRIBE_URL ?? ""
    static UNSUBSCRIBE_URL = process.env.API_UNSUBSCRIBE_URL ?? ""

    static SUPPORT_GENERIC_NICKNAME = process.env.SUPPORT_GENERIC_NICKNAME ?? "Support"
    static CLIENT_GENERIC_NAME_COMMENTS = process.env.CLIENT_GENERIC_NAME_COMMENTS ?? "You"

    static REQUEST_LIST_TAG = "requestlisttag";
    static COMMENT_LIST_TAG = "commentisttag";
    static USER_TAG = "userinfo";
    static CONTENT_TAG = "content";

    static CACHE_PREFIX = process.env.CACHE_PREFIX;
    static REDDIS_URL = process.env.REDIS_URL;
    static REDDIS_CONNECTION_PARAM = process.env.REDIS_URL ? { url : process.env.REDIS_URL } : undefined;

    
  }
