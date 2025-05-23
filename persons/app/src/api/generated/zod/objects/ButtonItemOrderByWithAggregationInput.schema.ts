/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ButtonItemCountOrderByAggregateInputObjectSchema } from './ButtonItemCountOrderByAggregateInput.schema';
import { ButtonItemAvgOrderByAggregateInputObjectSchema } from './ButtonItemAvgOrderByAggregateInput.schema';
import { ButtonItemMaxOrderByAggregateInputObjectSchema } from './ButtonItemMaxOrderByAggregateInput.schema';
import { ButtonItemMinOrderByAggregateInputObjectSchema } from './ButtonItemMinOrderByAggregateInput.schema';
import { ButtonItemSumOrderByAggregateInputObjectSchema } from './ButtonItemSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.ButtonItemOrderByWithAggregationInput>;
export const ButtonItemOrderByWithAggregationInputObjectSchema: SchemaType = z.object({
    id: z.lazy(() => SortOrderSchema).optional().optional(), createdAt: z.lazy(() => SortOrderSchema).optional().optional(), updatedAt: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), isDeleted: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), groupId: z.lazy(() => SortOrderSchema).optional().optional(), sort: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), type: z.lazy(() => SortOrderSchema).optional().optional(), title: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), content: z.lazy(() => SortOrderSchema).optional().optional(), _count: z.lazy(() => ButtonItemCountOrderByAggregateInputObjectSchema).optional().optional(), _avg: z.lazy(() => ButtonItemAvgOrderByAggregateInputObjectSchema).optional().optional(), _max: z.lazy(() => ButtonItemMaxOrderByAggregateInputObjectSchema).optional().optional(), _min: z.lazy(() => ButtonItemMinOrderByAggregateInputObjectSchema).optional().optional(), _sum: z.lazy(() => ButtonItemSumOrderByAggregateInputObjectSchema).optional().optional()
}).strict() as SchemaType;
