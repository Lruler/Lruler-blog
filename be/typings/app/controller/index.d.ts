// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/controller/blog';
import ExportLogin from '../../../app/controller/login';
import ExportTag from '../../../app/controller/tag';

declare module 'egg' {
  interface IController {
    blog: ExportBlog;
    login: ExportLogin;
    tag: ExportTag;
  }
}
