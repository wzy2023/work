/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserAccountCountOrderByAggregateInput>;
export const UserAccountCountOrderByAggregateInputObjectSchema: SchemaType = z.object({
    id: z.lazy(() => SortOrderSchema).optional().optional(), createdAt: z.lazy(() => SortOrderSchema).optional().optional(), updatedAt: z.lazy(() => SortOrderSchema).optional().optional(), isDeleted: z.lazy(() => SortOrderSchema).optional().optional(), userId: z.lazy(() => SortOrderSchema).optional().optional(), type: z.lazy(() => SortOrderSchema).optional().optional(), provider: z.lazy(() => SortOrderSchema).optional().optional(), providerAccountId: z.lazy(() => SortOrderSchema).optional().optional(), refresh_token: z.lazy(() => SortOrderSchema).optional().optional(), access_token: z.lazy(() => SortOrderSchema).optional().optional(), expires_at: z.lazy(() => SortOrderSchema).optional().optional(), token_type: z.lazy(() => SortOrderSchema).optional().optional(), scope: z.lazy(() => SortOrderSchema).optional().optional(), id_token: z.lazy(() => SortOrderSchema).optional().optional(), session_state: z.lazy(() => SortOrderSchema).optional().optional()
}).strict() as SchemaType;
