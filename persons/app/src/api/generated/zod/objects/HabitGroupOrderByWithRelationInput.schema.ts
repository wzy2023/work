/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { HabitItemOrderByRelationAggregateInputObjectSchema } from './HabitItemOrderByRelationAggregateInput.schema';
import { HabitGroupOrderByRelevanceInputObjectSchema } from './HabitGroupOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.HabitGroupOrderByWithRelationInput>;
export const HabitGroupOrderByWithRelationInputObjectSchema: SchemaType = z.object({
    id: z.lazy(() => SortOrderSchema).optional().optional(), createdAt: z.lazy(() => SortOrderSchema).optional().optional(), updatedAt: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), isDeleted: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), name: z.lazy(() => SortOrderSchema).optional().optional(), sort: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), color: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), children: z.lazy(() => HabitItemOrderByRelationAggregateInputObjectSchema).optional().optional(), _relevance: z.lazy(() => HabitGroupOrderByRelevanceInputObjectSchema).optional().optional()
}).strict() as SchemaType;
