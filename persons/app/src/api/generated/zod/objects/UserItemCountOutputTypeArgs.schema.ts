/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { UserItemCountOutputTypeSelectObjectSchema } from './UserItemCountOutputTypeSelect.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserItemCountOutputTypeArgs>;
export const UserItemCountOutputTypeArgsObjectSchema: SchemaType = z.object({
    select: z.lazy(() => UserItemCountOutputTypeSelectObjectSchema).optional().optional()
}).strict() as SchemaType;
