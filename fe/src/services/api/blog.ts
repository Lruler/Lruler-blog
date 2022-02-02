import Fetch from "../fetch";
import { blog } from "../../pages/blog/list";

const BASE = "/blog";

export const getList = (page: number) => Fetch(`${BASE}/list?page=${page}`);

export const postBlog = (blog: blog) =>
  Fetch(`${BASE}/add`, {
    method: "POST",
    data: blog,
  });
