/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { RssFetchLogOrderByRelevanceFieldEnumSchema } from '../enums/RssFetchLogOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.RssFetchLogOrderByRelevanceInput>;
export const RssFetchLogOrderByRelevanceInputObjectSchema: SchemaType = z.object({
    fields: z.union([z.lazy(() => RssFetchLogOrderByRelevanceFieldEnumSchema),
    z.lazy(() => RssFetchLogOrderByRelevanceFieldEnumSchema).array()]), sort: z.lazy(() => SortOrderSchema), search: z.string()
}).strict() as SchemaType;
