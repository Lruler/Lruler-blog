import { urlMap, HTTPAPI } from "../fetch";

const useBase = (url: string) => `/tags${url}`;

const tagUrlMap = () => {
  urlMap.set("getTags", useBase(""));
  urlMap.set("getBlogByTag", useBase("/getblog?tag"));
};

export interface TagsAPI {
  getTags: HTTPAPI<TagRes[]>;
  getBlogByTag: HTTPAPI<Blog[], getBlogByTagReq>;
}

export default tagUrlMap;
