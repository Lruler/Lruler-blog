import Fetch from "../fetch";
import { blog } from "../../pages/blog/list";

const BASE = "/blog";

export const getList = (page: number) => Fetch(`${BASE}/list?page=${page}`);

export const getBlog = (id: string) => Fetch(`${BASE}/get?id=${id}`);

export const postBlog = (blog: blog) =>
  Fetch(`${BASE}/add`, {
    method: "POST",
    data: blog,
  });

export const fileUpload = (file: FormData) =>
  Fetch(`${BASE}/upload`, {
    method: "POST",
    body: file,
  });
