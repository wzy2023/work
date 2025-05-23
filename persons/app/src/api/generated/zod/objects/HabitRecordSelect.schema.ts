/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { HabitItemArgsObjectSchema } from './HabitItemArgs.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.HabitRecordSelect>;
export const HabitRecordSelectObjectSchema: SchemaType = z.object({
    id: z.boolean().optional().optional(), createdAt: z.boolean().optional().optional(), updatedAt: z.boolean().optional().optional(), isDeleted: z.boolean().optional().optional(), date: z.boolean().optional().optional(), reason: z.boolean().optional().optional(), execList: z.boolean().optional().optional(), habit: z.union([z.boolean(),
    z.lazy(() => HabitItemArgsObjectSchema)]).optional(), habitId: z.boolean().optional().optional()
}).strict() as SchemaType;
