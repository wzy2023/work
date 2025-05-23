/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedFloatFilterObjectSchema } from './NestedFloatFilter.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.NestedIntWithAggregatesFilter>;
export const NestedIntWithAggregatesFilterObjectSchema: SchemaType = z.object({
    equals: z.number().optional().optional(), in: z.number().array().optional().optional(), notIn: z.number().array().optional().optional(), lt: z.number().optional().optional(), lte: z.number().optional().optional(), gt: z.number().optional().optional(), gte: z.number().optional().optional(), not: z.union([z.number(),
    z.lazy(() => NestedIntWithAggregatesFilterObjectSchema)]).optional(), _count: z.lazy(() => NestedIntFilterObjectSchema).optional().optional(), _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional().optional(), _sum: z.lazy(() => NestedIntFilterObjectSchema).optional().optional(), _min: z.lazy(() => NestedIntFilterObjectSchema).optional().optional(), _max: z.lazy(() => NestedIntFilterObjectSchema).optional().optional()
}).strict() as SchemaType;
