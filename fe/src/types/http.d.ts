interface httpRes<T> {
  msg: string;
  code: number;
  data: T;
}

interface httpReq extends RequestInit {
  body?: BodyInit | null | undefined | any
}
