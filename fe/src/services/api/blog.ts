import Fetch from "../fetch";

const BASE = "/blog";

export const getList = (page: number) => Fetch(`${BASE}/list?page=${page}`);
