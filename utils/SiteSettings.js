import GridiconAddImage from "gridicons/dist/add-image";
import GridiconLocation from "gridicons/dist/location";
import GridiconUser from "gridicons/dist/user";
import GridiconComputer from "gridicons/dist/computer";

export default class SiteSettings {
    static iconComponentFill = "red";
    static title  = "Treecat Software Inc";
    static topHeader  = "Power Platform is easy with";
    static companyName  = "Treecat Software Inc";
    static shortCompanyName  = "Treecat";
    static shortPitch  = "We provide targetted consulting and training services to the Canadian and US clients out of our Ottawa location";
    
    static servicesHeader = "Here is what we can do for you"
    static servicesSubHeader = "Feel free to reach out to us to know more - we are a small company, and we don't have a contact center, but we'll get back to you quickly to address your questions"
    static pricingHeader = "Our Offers"
    static pricingSubHeader = "We have prepared a few sample offers just to give you an idea of what's possible"
    
    static NewsHeader = "Power Platform News and Events";
    static NewsSubHeader = "For better or worse, Power Platform is always evolving. We hope you will find our weekly digest useful";

    static SubscribeHeader = "Subscribe Now!"
    static SubscribeSubHeader = "We can send Power Platform weekly news right to your inbox every week! You don't need to do a thing... well, other than to make sure those emails don't go to your junk folder!"

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
      "Power Pages Development and Training",
      "Power Platform Project Assessment",
      "Power Platform Solution Design and Architecture"
    ]
  }
