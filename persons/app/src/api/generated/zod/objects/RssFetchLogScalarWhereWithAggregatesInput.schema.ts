/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolNullableWithAggregatesFilterObjectSchema } from './BoolNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.RssFetchLogScalarWhereWithAggregatesInput>;
export const RssFetchLogScalarWhereWithAggregatesInputObjectSchema: SchemaType = z.object({
    AND: z.union([z.lazy(() => RssFetchLogScalarWhereWithAggregatesInputObjectSchema),
    z.lazy(() => RssFetchLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(), OR: z.lazy(() => RssFetchLogScalarWhereWithAggregatesInputObjectSchema).array().optional().optional(), NOT: z.union([z.lazy(() => RssFetchLogScalarWhereWithAggregatesInputObjectSchema),
    z.lazy(() => RssFetchLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(), id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema),
    z.string()]).optional(), createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()])]).optional(), updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.lazy(() => BoolNullableWithAggregatesFilterObjectSchema),
    z.boolean(),
    z.null()]).optional().nullable(), executedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()])]).optional(), status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema),
    z.string()]).optional(), errorMessage: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
    z.string(),
    z.null()]).optional().nullable(), itemCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema),
    z.number()]).optional(), triggerType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema),
    z.string()]).optional(), feedId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema),
    z.string()]).optional()
}).strict() as SchemaType;
