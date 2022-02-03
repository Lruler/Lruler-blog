export interface httpRes {
  msg: string;
  code: number;
  data: Record<string, any>;
}

export interface httpReq extends RequestInit {
  data?: object;
}
