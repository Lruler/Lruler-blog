import { urlMap, HTTPAPI } from "../fetch";

const useBase = (url: string) => `/blog${url}`;

const blogUrlMap = () => {
  urlMap.set("getList", useBase("/list?page"));
  urlMap.set("getBlog", useBase("/get?id"));
  urlMap.set("postBlog", useBase("/add"));
  urlMap.set("fileUpload", useBase("/upload"));
  urlMap.set('searchBlog', useBase('/search?key&page'))
  urlMap.set('updateBlog', useBase("/update"))
};

export interface BlogAPI {
  getList: HTTPAPI<getListRes, getListReq>;
  getBlog: HTTPAPI<getBlogRes, getBlogReq>;
  postBlog: HTTPAPI<postBlogRes, postBlogReq>;
  fileUpload: HTTPAPI<fileUploadRes, fileUploadReq>;
  searchBlog: HTTPAPI<searchBlogRes, searchBlogReq>;
  updateBlog: HTTPAPI<postBlogRes,updateBlogReq>
}

export default blogUrlMap;
// const BASE = "/blog";

// export const getList = (url: string, page: number) => Fetch(`${BASE + url}?page=${page}`);

// export const getBlog = (id: string) => Fetch(`${BASE}/get?id=${id}`);

// export const postBlog = (blog: Blob) =>
//   Fetch(`${BASE}/add`, {
//     method: "POST",
//     data: blog,
//   });

// export const fileUpload = (file: FormData) =>
//   Fetch(`${BASE}/upload`, {
//     method: "POST",
//     body: file,
//   });

// // interface Seal {
// //   name: string;
// //   url: string;
// // }
// // interface API {
// //   "/user": { name: string; age: number; phone: string };
// //   "/seals": { seal: Seal[] };
// // }
// // const api = <T extends keyof API>(url: T): Promise<API[T]> => {
// //   return fetch(url).then((res) => res.json());
// // };
