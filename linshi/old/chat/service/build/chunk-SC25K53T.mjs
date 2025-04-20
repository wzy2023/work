import {
  ChatUser
} from "./chunk-TNUXAUIA.mjs";
import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatShare.ts
init_esm_shims();
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
var ChatShare = class extends BaseEntity {
};
__decorateClass([
  PrimaryGeneratedColumn()
], ChatShare.prototype, "shareId", 2);
__decorateClass([
  ManyToOne((type) => ChatUser),
  JoinColumn()
], ChatShare.prototype, "inviter", 2);
__decorateClass([
  OneToOne((type) => ChatUser),
  JoinColumn()
], ChatShare.prototype, "invitee", 2);
__decorateClass([
  Column("int")
], ChatShare.prototype, "num", 2);
__decorateClass([
  Column({ type: "bigint" })
], ChatShare.prototype, "createAt", 2);
ChatShare = __decorateClass([
  Entity()
], ChatShare);

export {
  ChatShare
};
