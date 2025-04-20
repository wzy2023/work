import {
  ChatUser
} from "./chunk-TNUXAUIA.mjs";
import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatTalk.ts
init_esm_shims();
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
var ChatTalk = class extends BaseEntity {
};
__decorateClass([
  PrimaryColumn({ type: "bigint" })
], ChatTalk.prototype, "chatId", 2);
__decorateClass([
  Column("varchar")
], ChatTalk.prototype, "uuid", 2);
__decorateClass([
  ManyToOne((type) => ChatUser),
  JoinColumn()
], ChatTalk.prototype, "user", 2);
__decorateClass([
  Column("json")
], ChatTalk.prototype, "talks", 2);
__decorateClass([
  Column("bigint")
], ChatTalk.prototype, "createAt", 2);
__decorateClass([
  Column("bigint")
], ChatTalk.prototype, "updateAt", 2);
ChatTalk = __decorateClass([
  Entity()
], ChatTalk);

export {
  ChatTalk
};
