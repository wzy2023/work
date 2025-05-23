/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { UserItemCreateWithoutSessionsInputObjectSchema } from './UserItemCreateWithoutSessionsInput.schema';
import { UserItemUncheckedCreateWithoutSessionsInputObjectSchema } from './UserItemUncheckedCreateWithoutSessionsInput.schema';
import { UserItemCreateOrConnectWithoutSessionsInputObjectSchema } from './UserItemCreateOrConnectWithoutSessionsInput.schema';
import { UserItemUpsertWithoutSessionsInputObjectSchema } from './UserItemUpsertWithoutSessionsInput.schema';
import { UserItemWhereUniqueInputObjectSchema } from './UserItemWhereUniqueInput.schema';
import { UserItemUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './UserItemUpdateToOneWithWhereWithoutSessionsInput.schema';
import { UserItemUpdateWithoutSessionsInputObjectSchema } from './UserItemUpdateWithoutSessionsInput.schema';
import { UserItemUncheckedUpdateWithoutSessionsInputObjectSchema } from './UserItemUncheckedUpdateWithoutSessionsInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserItemUpdateOneRequiredWithoutSessionsNestedInput>;
export const UserItemUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: SchemaType = z.object({
    create: z.union([z.lazy(() => UserItemCreateWithoutSessionsInputObjectSchema), z.lazy(() => UserItemUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(), connectOrCreate: z.lazy(() => UserItemCreateOrConnectWithoutSessionsInputObjectSchema).optional().optional(), upsert: z.lazy(() => UserItemUpsertWithoutSessionsInputObjectSchema).optional().optional(), connect: z.lazy(() => UserItemWhereUniqueInputObjectSchema).optional().optional(), update: z.union([z.lazy(() => UserItemUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => UserItemUpdateWithoutSessionsInputObjectSchema), z.lazy(() => UserItemUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict() as SchemaType;
