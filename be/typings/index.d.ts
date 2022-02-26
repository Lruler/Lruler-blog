import "egg";

declare module "egg" {
  interface HttpRes {
    msg: string;
    code: number;
    data?: string | object;
  }
}
