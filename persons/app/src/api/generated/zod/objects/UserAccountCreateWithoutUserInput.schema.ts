/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';


import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserAccountCreateWithoutUserInput>;
export const UserAccountCreateWithoutUserInputObjectSchema: SchemaType = z.object({
    id: z.string().optional().optional(), createdAt: z.union([z.date().optional(), z.string().datetime().optional()]).optional(), updatedAt: z.union([z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.boolean(),
    z.null()]).optional().nullable(), type: z.string(), provider: z.string(), providerAccountId: z.string(), refresh_token: z.union([z.string(),
    z.null()]).optional().nullable(), access_token: z.union([z.string(),
    z.null()]).optional().nullable(), expires_at: z.union([z.number(),
    z.null()]).optional().nullable(), token_type: z.union([z.string(),
    z.null()]).optional().nullable(), scope: z.union([z.string(),
    z.null()]).optional().nullable(), id_token: z.union([z.string(),
    z.null()]).optional().nullable(), session_state: z.union([z.string(),
    z.null()]).optional().nullable()
}).strict() as SchemaType;
