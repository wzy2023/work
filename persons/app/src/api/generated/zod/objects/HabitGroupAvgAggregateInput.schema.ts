/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';


import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.HabitGroupAvgAggregateInputType>;
export const HabitGroupAvgAggregateInputObjectSchema: SchemaType = z.object({
    sort: z.literal(true).optional().optional()
}).strict() as SchemaType;
