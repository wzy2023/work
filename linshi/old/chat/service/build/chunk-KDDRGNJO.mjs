import {
  ChatUser
} from "./chunk-TNUXAUIA.mjs";
import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatIncome.ts
init_esm_shims();
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
var ChatIncome = class extends BaseEntity {
};
__decorateClass([
  PrimaryGeneratedColumn()
], ChatIncome.prototype, "incomeId", 2);
__decorateClass([
  ManyToOne((type) => ChatUser),
  JoinColumn()
], ChatIncome.prototype, "inviter", 2);
__decorateClass([
  ManyToOne((type) => ChatUser),
  JoinColumn()
], ChatIncome.prototype, "invitee", 2);
__decorateClass([
  Column({ type: "float", default: 0 })
], ChatIncome.prototype, "price", 2);
__decorateClass([
  Column({ type: "float", default: 0 })
], ChatIncome.prototype, "income", 2);
__decorateClass([
  Column({ type: "bigint" })
], ChatIncome.prototype, "createAt", 2);
ChatIncome = __decorateClass([
  Entity()
], ChatIncome);

export {
  ChatIncome
};
