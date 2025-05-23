/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { RssFeedUpdateWithoutItemsInputObjectSchema } from './RssFeedUpdateWithoutItemsInput.schema';
import { RssFeedUncheckedUpdateWithoutItemsInputObjectSchema } from './RssFeedUncheckedUpdateWithoutItemsInput.schema';
import { RssFeedCreateWithoutItemsInputObjectSchema } from './RssFeedCreateWithoutItemsInput.schema';
import { RssFeedUncheckedCreateWithoutItemsInputObjectSchema } from './RssFeedUncheckedCreateWithoutItemsInput.schema';
import { RssFeedWhereInputObjectSchema } from './RssFeedWhereInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.RssFeedUpsertWithoutItemsInput>;
export const RssFeedUpsertWithoutItemsInputObjectSchema: SchemaType = z.object({
    update: z.union([z.lazy(() => RssFeedUpdateWithoutItemsInputObjectSchema), z.lazy(() => RssFeedUncheckedUpdateWithoutItemsInputObjectSchema)]), create: z.union([z.lazy(() => RssFeedCreateWithoutItemsInputObjectSchema), z.lazy(() => RssFeedUncheckedCreateWithoutItemsInputObjectSchema)]), where: z.lazy(() => RssFeedWhereInputObjectSchema).optional().optional()
}).strict() as SchemaType;
