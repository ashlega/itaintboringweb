

//redis example
//https://makerkit.dev/blog/tutorials/nextjs-redis

var cache = require('./mem-cache')

interface DataCache
{
  set : Function;
  get : Function;
  del : Function;
}

export function getCache(
    
  ) : DataCache {
     
    var response : DataCache = {
      set : (key : any, value: any, time: any = 3600000) : void => {
        cache.put(key, value, time);
      },

      get : (key : any) : any => {
          return cache.get(key);
      },

      del : (key : any) : void => {
        cache.put(key, null, 1);
      }
    }
    return response;
  }