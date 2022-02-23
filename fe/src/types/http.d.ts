interface httpRes<T> {
  msg: string;
  code: number;
  data: T;
}

interface httpReq extends RequestInit {
  data?: object | FormData;
}

