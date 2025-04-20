import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatSMSCode.ts
init_esm_shims();
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
var ChatSMSCode = class extends BaseEntity {
};
__decorateClass([
  PrimaryGeneratedColumn({ type: "bigint" })
], ChatSMSCode.prototype, "smsId", 2);
__decorateClass([
  Column("varchar")
], ChatSMSCode.prototype, "mobile", 2);
__decorateClass([
  Column("varchar")
], ChatSMSCode.prototype, "code", 2);
__decorateClass([
  Column("bigint")
], ChatSMSCode.prototype, "expDate", 2);
__decorateClass([
  Column({ type: "tinyint", default: 0 })
], ChatSMSCode.prototype, "used", 2);
__decorateClass([
  Column("bigint")
], ChatSMSCode.prototype, "createAt", 2);
ChatSMSCode = __decorateClass([
  Entity()
], ChatSMSCode);

export {
  ChatSMSCode
};
