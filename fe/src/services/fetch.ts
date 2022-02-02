const BASE = "/api";

interface httpReq extends RequestInit {
  data?: object;
}

type fetchAPI<T> = (params: T) => Promise<any>;

export const useFetch = async <T>(req: fetchAPI<T>, params: T) => {
  const data = await req(params);
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
