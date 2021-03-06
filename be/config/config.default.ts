import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645515799273_6553';

  // add your egg config in here
  config.middleware = [];


  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  const userConfig = {
    uploadDir: 'app/public/upload',
  };

  config.multipart = {
    mode: 'stream',
  };

  config.jwt = {
    secret: '123456',
  };

  config.cors = {
    origin: '*', // 解决跨域问题
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...userConfig,
  };
};
