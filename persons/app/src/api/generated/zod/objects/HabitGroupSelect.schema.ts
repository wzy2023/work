/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { HabitItemInputSchema } from '../input/HabitItemInput.schema';
import { HabitGroupCountOutputTypeArgsObjectSchema } from './HabitGroupCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.HabitGroupSelect>;
export const HabitGroupSelectObjectSchema: SchemaType = z.object({
    id: z.boolean().optional().optional(), createdAt: z.boolean().optional().optional(), updatedAt: z.boolean().optional().optional(), isDeleted: z.boolean().optional().optional(), name: z.boolean().optional().optional(), sort: z.boolean().optional().optional(), color: z.boolean().optional().optional(), children: z.union([z.boolean(),
    z.lazy(() => HabitItemInputSchema.findMany)]).optional(), _count: z.union([z.boolean(),
    z.lazy(() => HabitGroupCountOutputTypeArgsObjectSchema)]).optional()
}).strict() as SchemaType;
