/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { UserSessionWhereInputObjectSchema } from './UserSessionWhereInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserSessionListRelationFilter>;
export const UserSessionListRelationFilterObjectSchema: SchemaType = z.object({
    every: z.lazy(() => UserSessionWhereInputObjectSchema).optional().optional(), some: z.lazy(() => UserSessionWhereInputObjectSchema).optional().optional(), none: z.lazy(() => UserSessionWhereInputObjectSchema).optional().optional()
}).strict() as SchemaType;
