interface Blog {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  title: string;
  intro: string;
  tags: TagRes[] | string;
}

interface getListReq {
  page: number;
}

interface getListRes {
  rows: Blog[];
}

interface getBlogReq {
  id: string;
}

interface getBlogRes extends Blog {}

interface postBlogReq extends Partial<Blog> {}

interface postBlogRes {}

interface fileUploadReq extends FormData {}

interface fileUploadRes {
  url: string;
}

interface searchBlogReq extends getListReq {
  key: string;
}

interface searchBlogRes {
  rows: Blog[];
}
