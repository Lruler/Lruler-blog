// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwtV from '../../../app/middleware/jwtV';

declare module 'egg' {
  interface IMiddleware {
    jwtV: typeof ExportJwtV;
  }
}
