import GridiconAddImage from "gridicons/dist/add-image";
import GridiconLocation from "gridicons/dist/location";
import GridiconUser from "gridicons/dist/user";
import GridiconComputer from "gridicons/dist/computer";


export default class SiteSettings {
    static iconComponentFill = process.env.ICON_COMPONENT_FILL;
    static title  = process.env.SITE_TITLE;
    static topHeader  = process.env.TOP_HEADER;
    static companyName  = process.env.COMPANY_NAME;
    static shortCompanyName  = process.env.SHORT_COMPANY_NAME;
    static shortPitch  = process.env.SHORT_PITCH;

    static servicesHeader = process.env.SERVICES_HEADER
    static servicesSubHeader = process.env.SERVICES_SUB_HEADER
    static servicesHeaderAbout = process.env.SERVICES_HEADER_ABOUT
    static servicesSubHeaderAbout = process.env.SERVICES_SUB_HEADER_ABOUT
    static servicesListHeaderAbout = process.env.SERVICES_LIST_HEADER_ABOUT
    
    static pricingHeader = process.env.PRICIG_HEADER
    static pricingSubHeader = process.env.PRICIG_SUB_HEADER
    
    static NewsHeader = process.env.NEWS_HEADER
    static NewsSubHeader = process.env.NEWS_SUB_HEADER

    static SubscribeHeader = process.env.SUBSCRIBE_HEADER
    static SubscribeSubHeader = process.env.SUBSCRIBE_SUB_HEADER

    //SEO
    static Title = process.env.SEO_TITLE
    static Author = process.env.SEO_AUTHOR
    static SiteName = process.env.SEO_SITE_NAME
    static Description = process.env.SEO_DESCRIPTION

    static defaultAlt = process.env.DEFAULT_ALT

    static footerSlogan=process.env.FOOTER_SLOGAN

    static highlightsList  = JSON.parse(process.env.HIGHLIGHTS_LIST)
    static listNews = JSON.parse(process.env.NEWS_LIST) 
    static servicesList = JSON.parse(process.env.SERVICES_LIST)
    static offers = JSON.parse(process.env.OFFERS)

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
    
    static REDDIS_URL = process.env.REDIS_URL;
    static REDDIS_CONNECTION_PARAM = process.env.REDIS_URL ? { url : process.env.REDIS_URL } : undefined;

    static CACHE_PREFIX = process.env.CACHE_PREFIX;
    static ADMIN_KEY = process.env.ADMIN_KEY ?? "devkey"
  }
  
  