import {
  ChatUser
} from "./chunk-TNUXAUIA.mjs";
import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatOrder.ts
init_esm_shims();
import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
var ChatOrder = class extends BaseEntity {
};
__decorateClass([
  PrimaryColumn("varchar")
], ChatOrder.prototype, "orderId", 2);
__decorateClass([
  ManyToOne((type) => ChatUser),
  JoinColumn()
], ChatOrder.prototype, "user", 2);
__decorateClass([
  Column("json")
], ChatOrder.prototype, "sku", 2);
__decorateClass([
  Column("varchar")
], ChatOrder.prototype, "status", 2);
__decorateClass([
  Column("varchar")
], ChatOrder.prototype, "wxPayUrl", 2);
__decorateClass([
  Column("bigint")
], ChatOrder.prototype, "createAt", 2);
__decorateClass([
  Column({ type: "bigint", nullable: true })
], ChatOrder.prototype, "payAt", 2);
__decorateClass([
  Column({ type: "bigint", nullable: true })
], ChatOrder.prototype, "updateAt", 2);
ChatOrder = __decorateClass([
  Entity()
], ChatOrder);

export {
  ChatOrder
};
