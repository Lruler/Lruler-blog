import blogUrlMap, { BlogAPI } from "./api/blog";
import loginUrlMap, { LoginAPI } from "./api/login";
const BASE = "/api";

/* 

先定义useFetch接收的参数
利用该特性



useFetch = <api extends keyof API, K>(httpAPI: api, params?: K): => Promise<httpRes<API[httpAPI]>> => {
  const data = params ? await (req as fetchWithParams<K>)(params) : await (req as fetchWithoutParams)();
  return data;
}



*/

// interface API {
//   "/list": ListRes;
//   "/upload": TagRes;
// }

// type fetchWithParams<T> = (url: string, params: T) => Promise<any>;
// type fetchWithoutParams = (url: string) => Promise<any>;
// type fetchAPI<T> = fetchWithParams<T> | fetchWithoutParams;

// export const useFetch = async <url extends keyof API, params>(
//   reqUrl: url,
//   reqAPI: fetchAPI<params>,
//   reqParams?: params
// ): Promise<httpRes<API[url]>> => {
//   const data = reqParams
//     ? await (reqAPI as fetchWithParams<params>)(reqUrl, reqParams)
//     : await (reqAPI as fetchWithoutParams)(reqUrl);
//   return data;
// };

// export default async (
//   url: string,
//   opt?: httpReq
// ): Promise<null | unknown> => {
//   try {
//     url = BASE + url;
//     if (opt) {
//       opt.method = opt.method || "GET";

//       opt.headers = opt.headers || {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       };

//       if (opt.data) {
//         opt.body = JSON.stringify(opt.data);
//       } else {
//         opt.headers = {};
//       }
//     }

//     const res = await fetch(url, opt);
//     const data = await res.json();
//     if (data) return data;
//     else return null;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

export type HTTPAPI<T, K = any> = {
  'res': T
  'req'?: K
}

type method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

interface API extends BlogAPI, LoginAPI  {}


export let urlMap = new Map();

blogUrlMap();
loginUrlMap();


const getUrl = (api: string, query?: string[]): string => {
  let url: string = urlMap.get(api)
  if (typeof query === 'object') {
    url = url.split('&').map((q, i) => `${q}=${query[i]}`).join('&')
  }
  return url
}


type res = Promise<httpRes<API[keyof API]['res']>>

const Fetch = async <T>(url: string, opt?: httpReq): Promise<T | any> => {
  try {
    url = BASE + url;
    if (opt) {
      opt.method = opt.method || "GET";

      opt.headers = opt.headers || {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (opt.data) {
        opt.body = JSON.stringify(opt.data);
      } else {
        opt.headers = {};
      }
    }

    const res = await fetch(url, opt);
    const data = await res.json();
    if (data) return data;
    else return null;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const useFetch = async <api extends keyof API>(
  reqAPI: api,
  reqData?: API[api]['req'],
  method: method = 'GET'
): Promise<httpRes<API[api]['res']>> => {
  let data
  if (method === 'GET') {
    data = reqData ? await Fetch<res>(getUrl(reqAPI, Object.values(reqData))) : await Fetch<res>(getUrl(reqAPI))
  }
  else {
    data = await Fetch<Promise<httpRes<API[api]['res']>>>(getUrl(reqAPI), { method, data: reqData })
  }
  return data;
};

export default useFetch
