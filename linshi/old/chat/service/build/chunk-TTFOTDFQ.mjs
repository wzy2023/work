import {
  __decorateClass,
  init_esm_shims
} from "./chunk-S56SCEII.mjs";

// src/entities/ChatSystem.ts
init_esm_shims();
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
var ChatSystem = class extends BaseEntity {
};
__decorateClass([
  PrimaryColumn({ type: "varchar" })
], ChatSystem.prototype, "type", 2);
__decorateClass([
  Column("json")
], ChatSystem.prototype, "value", 2);
__decorateClass([
  Column({ type: "bigint" })
], ChatSystem.prototype, "createAt", 2);
__decorateClass([
  Column("bigint")
], ChatSystem.prototype, "updateAt", 2);
ChatSystem = __decorateClass([
  Entity()
], ChatSystem);

export {
  ChatSystem
};
