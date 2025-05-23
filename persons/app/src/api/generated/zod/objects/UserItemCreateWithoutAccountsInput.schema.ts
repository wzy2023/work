/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { UserSessionCreateNestedManyWithoutUserInputObjectSchema } from './UserSessionCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserItemCreateWithoutAccountsInput>;
export const UserItemCreateWithoutAccountsInputObjectSchema: SchemaType = z.object({
    id: z.string().optional().optional(), createdAt: z.union([z.date().optional(), z.string().datetime().optional()]).optional(), updatedAt: z.union([z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.boolean(),
    z.null()]).optional().nullable(), email: z.string(), name: z.union([z.string(),
    z.null()]).optional().nullable(), image: z.union([z.string(),
    z.null()]).optional().nullable(), role: z.string().optional().optional(), sessions: z.lazy(() => UserSessionCreateNestedManyWithoutUserInputObjectSchema).optional().optional()
}).strict() as SchemaType;
