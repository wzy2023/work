/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderDemandCountOrderByAggregateInputObjectSchema } from './OrderDemandCountOrderByAggregateInput.schema';
import { OrderDemandMaxOrderByAggregateInputObjectSchema } from './OrderDemandMaxOrderByAggregateInput.schema';
import { OrderDemandMinOrderByAggregateInputObjectSchema } from './OrderDemandMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.OrderDemandOrderByWithAggregationInput>;
export const OrderDemandOrderByWithAggregationInputObjectSchema: SchemaType = z.object({
    id: z.lazy(() => SortOrderSchema).optional().optional(), createdAt: z.lazy(() => SortOrderSchema).optional().optional(), updatedAt: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), isDeleted: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), type: z.lazy(() => SortOrderSchema).optional().optional(), source: z.lazy(() => SortOrderSchema).optional().optional(), confirmed: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), title: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), desc: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), url: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), person: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), price: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), applyNum: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), createTime: z.union([z.lazy(() => SortOrderSchema),
    z.lazy(() => SortOrderInputObjectSchema)]).optional(), _count: z.lazy(() => OrderDemandCountOrderByAggregateInputObjectSchema).optional().optional(), _max: z.lazy(() => OrderDemandMaxOrderByAggregateInputObjectSchema).optional().optional(), _min: z.lazy(() => OrderDemandMinOrderByAggregateInputObjectSchema).optional().optional()
}).strict() as SchemaType;
