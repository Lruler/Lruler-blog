const BASE = "/api";

interface httpReq extends RequestInit {
  data?: object;
}

type fetchAPI<T> = (params: T) => Promise<any>;

export const useFetch = async <T>(req: fetchAPI<T>, params: T) => {
  const data = await req(params);
  return data
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
    throw e;
  }
};

// export default function Fetch(url: string, opt?: httpReq) {
//   url = BASE + url;
//   if (opt) {
//     opt.method = opt.method || "GET";

//     opt.headers = opt.headers || {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     };

//     if (opt.data) {
//       opt.body = JSON.stringify(opt.data);
//     }
//   }

//   return fetch(url, opt)
//     .then((response) => {
//       if (response.ok) {
//         return response.json().then((res) => {
//           return res;
//         });
//       } else {
//         return response.json().then((res) => {
//           return new Promise((_, reject) => {
//             reject(res);
//           });
//         });
//       }
//     })
//     .catch((e: Error) => {
//       console.log(`服务端错误:${e.message}`);
//       throw e;
//     });
// }
