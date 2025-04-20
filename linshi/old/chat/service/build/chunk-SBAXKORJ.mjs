import {
  ChatUser
} from "./chunk-TNUXAUIA.mjs";
import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatPoint.ts
init_esm_shims();
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
var ChatPoint = class extends BaseEntity {
};
__decorateClass([
  PrimaryGeneratedColumn()
], ChatPoint.prototype, "pointId", 2);
__decorateClass([
  ManyToOne((type) => ChatUser, { nullable: true }),
  JoinColumn()
], ChatPoint.prototype, "user", 2);
__decorateClass([
  Column("varchar")
], ChatPoint.prototype, "pointType", 2);
__decorateClass([
  Column("varchar")
], ChatPoint.prototype, "pointName", 2);
__decorateClass([
  Column({ type: "varchar", nullable: true })
], ChatPoint.prototype, "pointDesc", 2);
__decorateClass([
  Column("varchar")
], ChatPoint.prototype, "pageUrl", 2);
__decorateClass([
  Column("json")
], ChatPoint.prototype, "userAgent", 2);
__decorateClass([
  Column({ type: "json", nullable: true })
], ChatPoint.prototype, "extraData", 2);
__decorateClass([
  Column("bigint")
], ChatPoint.prototype, "createAt", 2);
ChatPoint = __decorateClass([
  Entity()
], ChatPoint);

export {
  ChatPoint
};
