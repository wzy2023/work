/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.RssFetchLogAvgOrderByAggregateInput>;
export const RssFetchLogAvgOrderByAggregateInputObjectSchema: SchemaType = z.object({
    itemCount: z.lazy(() => SortOrderSchema).optional().optional()
}).strict() as SchemaType;
