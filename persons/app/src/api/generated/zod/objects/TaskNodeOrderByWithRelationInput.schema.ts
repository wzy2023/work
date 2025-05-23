/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TaskNodeOrderByRelevanceInputObjectSchema } from './TaskNodeOrderByRelevanceInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.TaskNodeOrderByWithRelationInput>;
export const TaskNodeOrderByWithRelationInputObjectSchema: SchemaType = z.object({
    id: z.lazy(() => SortOrderSchema).optional().optional(), createdAt: z.lazy(() => SortOrderSchema).optional().optional(), updatedAt: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), isDeleted: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), type: z.lazy(() => SortOrderSchema).optional().optional(), data: z.lazy(() => SortOrderSchema).optional().optional(), _relevance: z.lazy(() => TaskNodeOrderByRelevanceInputObjectSchema).optional().optional()
}).strict() as SchemaType;
