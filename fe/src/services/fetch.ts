const BASE = "/api";

interface req extends RequestInit {
  data?: object;
}

export default function Fetch(url: string, opt?: req) {
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

  return fetch(url, opt)
    .then((response) => {
      if (response.ok) {
        return response.json().then((res) => {
          return res;
        });
      } else {
        return response.json().then((res) => {
          return new Promise((_, reject) => {
            reject(res);
          });
        });
      }
    })
    .catch((e) => {
      console.log(`服务端错误：${e.message}`);
      throw e;
    });
}
