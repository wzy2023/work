/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { CommonGroupLayoutSelectObjectSchema } from './CommonGroupLayoutSelect.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.CommonGroupLayoutArgs>;
export const CommonGroupLayoutArgsObjectSchema: SchemaType = z.object({
    select: z.lazy(() => CommonGroupLayoutSelectObjectSchema).optional().optional()
}).strict() as SchemaType;
