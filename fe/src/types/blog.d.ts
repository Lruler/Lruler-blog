interface Blog {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  title: string;
  tags: TagRes[];
}

interface getListReq {
  page: number;
}

interface getListRes {
  rows: Blog[];
}

interface getBlogReq {
  id: number;
}

interface getBlogRes extends Blog {}

interface postBlogReq extends Partial<Blog> {}

interface postBlogRes {}

interface fileUploadReq {
  file: FormData;
}

interface fileUploadRes {
  url: string;
}