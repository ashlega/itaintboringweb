//import {createRedisInstance} from './redis'
import { createClient } from 'redis';
import SiteSettings from '../utils/SiteSettings';
import { Session } from "next-auth"


//redis example
//https://makerkit.dev/blog/tutorials/nextjs-redis

//var cache = require('./mem-cache')

var client = createClient(process.env.REDIS_URL ? { url : process.env.REDIS_URL } : undefined);

client.on('error', (err : any) => {
  /*console.log('client error', err)*/
}
);
client.on('connect', () => {
  /*console.log('client is connected')*/
});
client.on('reconnecting', () => {
  /*console.log('client is reconnecting')*/
});
client.on('ready', () => {
  /*console.log('client is ready')*/
});
client.on('end', () => {
  /*console.log('client disconnected')*/
});
client.connect();
/*
async function  getClientInternal()  
{
  if(!client || !client.isOpen)
  {
    client = createClient({ url : process.env.REDIS_URL });
    await client.connect();
    client.on('error', (err : any) => console.log('client error', err));
    client.on('connect', () => console.log('client is connected'));
    client.on('reconnecting', () => console.log('client is reconnecting'));
    client.on('ready', () => console.log('client is ready'));
    client.on('end', () => console.log('client disconnected'));
      
  }
  return client;
};
*/

interface DataCache
{
  set(key : any, value: any, time: any): Promise<void>;
  set(key : any, value: any): Promise<void>;
  get(key : any) : Promise<any>;
  del(key : any) : Promise<void>;
  getClient() : any;

  getUserCacheKey(email : string | null, provider: string | null | undefined) : string;
  getRequestCommentListCacheKey(session : Session | null, requestid : string | null) : string;
  getContentCacheKey(contentid : string | null) : string;
  getActiveRequestListCacheKey(session : Session | null) : string 
  getInActiveRequestListCacheKey(session : Session | null) : string 
  getFileListKey(objectId : string | null, objectType : string | null) : string
}

export function getCache(
    
  ) : DataCache {

     
    var response : DataCache = {

      getClient : () => {
        return client;//getClientInternal();
      },

      set : async (key : any, value: any, exTime: any = 60*60*24) : Promise<void> => {
        //var client = getClient();
        //if(!client.isOpen) await client.connect();
        //if(!client.isOpen) await client.connect();
        await client.set(process.env.CACHE_PREFIX + key, JSON.stringify(value), {EX: exTime});
        //await client.disconnect();
        return new Promise<void>((resolve, reject) => {
          resolve();
        });
        //cache.put(key, value, time);
      },

      get : async (key : any) : Promise<any> => {
        //var client = getClient();
        //if(!client.isOpen) c
        //if(!client.isOpen) await client.connect();
        var result = await client.get(process.env.CACHE_PREFIX + key);
        //await client.disconnect();
        result = result ? JSON.parse(result) : null;
        
        return new Promise<any>((resolve, reject) => {
          resolve(result);
        });
          //return cache.get(key);
      },

      del : async (key : any) : Promise<void> => {
        //var client = await getClient();
        //if(!client.isOpen) await client.connect();
        await client.del(process.env.CACHE_PREFIX + key)
        //await client.disconnect();
        return new Promise<void>((resolve, reject) => {
          resolve();
        });
        //cache.put(key, null, 1);
      },

      getUserCacheKey: (email : string | null, provider: string | null | undefined) : string =>
      {
        return "user_"+email+"_provider_"+provider;
      },

      getRequestCommentListCacheKey: (session : Session | null, requestid : string | null) : string =>
      {
        var anySession : any = session;
        return anySession?.user?.cachePrefix + anySession?.user?.id + "_commentlist_" + requestid;
      },
      getActiveRequestListCacheKey: (session : Session | null) : string =>
      {
        var anySession : any = session;
        return anySession?.user?.cachePrefix + anySession?.user?.id + "_active_requestlist";
      },
      getInActiveRequestListCacheKey: (session : Session | null) : string =>
      {
        var anySession : any = session;
        return anySession?.user?.cachePrefix + anySession?.user?.id + "_inactive_requestlist";
      },
      getContentCacheKey: (contentid : string | null) : string =>
      {
        return "content_" + contentid;
      },
      getFileListKey: (objectId : string | null, objectType : string | null) : string =>
      {
        return `${objectId}${objectType}`;
      }
    }
    return response;
  }