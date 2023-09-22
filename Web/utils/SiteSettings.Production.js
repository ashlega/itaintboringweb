import GridiconAddImage from "gridicons/dist/add-image";
import GridiconLocation from "gridicons/dist/location";
import GridiconUser from "gridicons/dist/user";
import GridiconComputer from "gridicons/dist/computer";


export default class SiteSettings {

  static SUPPORT_GENERIC_NICKNAME = "Treecat Software Inc"
  static CLIENT_GENERIC_NAME_COMMENTS = "You"

  static iconComponentFill = "red"
  static title  = "Treecat Software Inc"
  static topHeader  = "Power Platform is better with"
  static companyName  = "Treecat Software Inc"
  static shortCompanyName  = "Treecat"
  static shortPitch  = "Looking for some help with your Power Platform implementation? Our targetted consulting and training services might be just what you need!"

  static servicesHeader = "Here is what we can do for you"
  static servicesSubHeader = "Feel free to reach out to us to know more - drop us a note and we'll do our best to get back to you ASAP!"
  static servicesHeaderAbout = "Who are we?"
  static servicesSubHeaderAbout = "We are Treecat! Please feel free to reach out to us to know more - it seems we've been working on the projects a little too hard, and we may have forgotten to set up a contact center, but just drop us a note and we'll do our best to get back to you ASAP!"
  static servicesListHeaderAbout = "Here is what we do"
  
  static pricingHeader = "Our Offers"
  static pricingSubHeader = "We have prepared a few sample offers just to give you an idea of what's possible"
  
  static NewsHeader = "Power Platform News and Events"  
  static NewsSubHeader = "For better or worse, Power Platform is always evolving. We hope you will find our Power Platform news digest useful"

  static SubscribeHeader = "Subscribe Now!"
  static SubscribeSubHeader = "We can send Power Platform weekly news right to your inbox every week! You don't need to do a thing... well, other than to make sure those emails don't go to your junk folder!"

  //SEO
  static Title = "Treecat Software Inc"
  static Author = "Alex Shlega"
  static SiteName = "Treecat Softwre Inc"
  static Description = "Treecat Software Inc - Power Platform is better with Treecat!"

  static defaultAlt = "Treecat Software Inc"  

  static footerSlogan="Treecat Software Inc - boosting your power"

  static highlightsList  = [
    {
      description: "2+",
      title: "Team Members",
      iconComponent:  "GridiconUser",
      icon: "/assets/Icon/heroicons_sm-user.svg"
    },
    {
      description: "Ottawa, ON",
      title: "Location",
      iconComponent: "GridiconLocation",
      icon: "/assets/Icon/gridicons_location.svg"
    },
    {
      description: "Solutioning, Architecture, Development, and Training performed by our consultants and MVP-s",
      title: "Skills and Certifications",
      iconComponent: "GridiconComputer",
      icon: "/assets/Icon/bx_bxs-server.svg"
    }];
  
  static listNews = [
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
  static servicesList = [
      "Power Apps and Power Automate Consulting",
      "Power Apps and Power Automate Training",
      "Power Platform Project Assessment",
      "Power Platform Solution Design and Architecture"
  ]
  static offers = [
    {
      icon: "/assets/Free.png",
      title:"Per Hour",
      items:[
       "No long-term commitment from you",
       "Reduced availability from us",
       "Works great for when you need help occasionally",
       "40 hours minimum, 10 hours increments after that",
       "No long-term commitment from you"
      ],
      terms:"$135 USD per hour"
    },
    {
      icon: "/assets/Standard.png",
      title:"Long term",
      items:[
       "Works great for when you can anticipate at least 400 hours of work",
       "Increased availability from us",
       "400 hours min in total to spend 6 months or less with the burn rate of at least 50 hours per month",
       "80 hours increments after the initial 400 hours"
      ],
      terms:"$125 USD per hour"
    },
    {
      icon: "/assets/Premium.png",
      title:"Scope & Duration Based",
      items:[
       "Let us discuss your project or training requirements",
       "And come up with the duration / estimate",
       "From there, let us see whether we can make you an offer",
       "So we could sign a contract",
       "And complete the work"
      ],
      terms:"Scope & Duration based pricing"
    }
 ]
}
  

  
  