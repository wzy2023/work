/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { TaskEdgeWhereInputObjectSchema } from './TaskEdgeWhereInput.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.TaskEdgeWhereUniqueInput>;
export const TaskEdgeWhereUniqueInputObjectSchema: SchemaType = z.object({
    id: z.string().optional().optional(), AND: z.union([z.lazy(() => TaskEdgeWhereInputObjectSchema),
    z.lazy(() => TaskEdgeWhereInputObjectSchema).array()]).optional(), OR: z.lazy(() => TaskEdgeWhereInputObjectSchema).array().optional().optional(), NOT: z.union([z.lazy(() => TaskEdgeWhereInputObjectSchema),
    z.lazy(() => TaskEdgeWhereInputObjectSchema).array()]).optional(), createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()])]).optional(), updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.lazy(() => BoolNullableFilterObjectSchema),
    z.boolean(),
    z.null()]).optional().nullable(), type: z.union([z.lazy(() => StringFilterObjectSchema),
    z.string()]).optional(), source: z.union([z.lazy(() => StringFilterObjectSchema),
    z.string()]).optional(), target: z.union([z.lazy(() => StringFilterObjectSchema),
    z.string()]).optional()
}).strict() as SchemaType;
