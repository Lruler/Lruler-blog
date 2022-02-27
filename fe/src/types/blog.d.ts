interface Blog {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  title: string;
  tags: string;
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
