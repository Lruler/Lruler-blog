interface httpRes<T> {
  msg: string;
  code: number;
  data: T;
}

type httpHeaders = { token: string | null};

interface httpReq extends RequestInit {
  body?: BodyInit | null | undefined | any;
}
