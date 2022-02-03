import { httpReq, httpRes } from "./interface";

const BASE = "/api";

type fetchWithParams<T> = (params: T) => Promise<any>;
type fetchWithoutParams = () => Promise<any>
type fetchAPI<T> = fetchWithParams<T> | fetchWithoutParams

export const useFetch = async <T>(req: fetchAPI<T>, params?: T): Promise<httpRes> => {
  const data = params ? await (req as fetchWithParams<T>)(params) : (req as fetchWithoutParams)();
  return data;
};

export default async (url: string, opt?: httpReq) => {
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
