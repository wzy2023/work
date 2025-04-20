import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatUser.ts
init_esm_shims();
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
var ChatUser = class extends BaseEntity {
};
__decorateClass([
  PrimaryColumn({ type: "varchar" })
], ChatUser.prototype, "uuid", 2);
__decorateClass([
  Column("varchar")
], ChatUser.prototype, "mobile", 2);
__decorateClass([
  Column({ type: "varchar", nullable: true })
], ChatUser.prototype, "openid", 2);
__decorateClass([
  Column({ type: "int", default: 0 })
], ChatUser.prototype, "count", 2);
__decorateClass([
  Column({ type: "int", default: 0 })
], ChatUser.prototype, "useCount", 2);
__decorateClass([
  Column({ type: "float", default: 0 })
], ChatUser.prototype, "payPrice", 2);
__decorateClass([
  Column({ type: "json", nullable: true })
], ChatUser.prototype, "wx", 2);
__decorateClass([
  Column({ type: "tinyint", default: 1 })
], ChatUser.prototype, "status", 2);
__decorateClass([
  Column({ type: "int", default: 1 })
], ChatUser.prototype, "role", 2);
__decorateClass([
  Column({ type: "float", default: 0 })
], ChatUser.prototype, "income", 2);
__decorateClass([
  Column("bigint")
], ChatUser.prototype, "createAt", 2);
__decorateClass([
  Column("bigint")
], ChatUser.prototype, "updateAt", 2);
ChatUser = __decorateClass([
  Entity()
], ChatUser);

export {
  ChatUser
};
