import {
  __commonJS,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// ormconfig.js
var require_ormconfig = __commonJS({
  "ormconfig.js"(exports, module) {
    init_esm_shims();
    module.exports = {
      type: "mysql",
      host: process.env.WECHAT_CLOUD_MYSQL_HOST,
      port: process.env.WECHAT_CLOUD_MYSQL_PORT,
      username: process.env.WECHAT_CLOUD_MYSQL_USER,
      password: process.env.WECHAT_CLOUD_MYSQL_PASSWORD,
      database: process.env.WECHAT_CLOUD_MYSQL_DB,
      entities: [
        "src/entities/*.*"
      ],
      synchronize: true
    };
  }
});
export default require_ormconfig();
