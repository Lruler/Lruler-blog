interface TagRes {
  id: number;
  tag: string;
  count?: number;
}

interface getBlogByTagReq {
  tag: string
}