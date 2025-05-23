/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { UserSessionWhereInputObjectSchema } from './UserSessionWhereInput.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserItemScalarRelationFilterObjectSchema } from './UserItemScalarRelationFilter.schema';
import { UserItemWhereInputObjectSchema } from './UserItemWhereInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.UserSessionWhereUniqueInput>;
export const UserSessionWhereUniqueInputObjectSchema: SchemaType = z.object({
    id: z.string().optional().optional(), sessionToken: z.string().optional().optional(), AND: z.union([z.lazy(() => UserSessionWhereInputObjectSchema),
    z.lazy(() => UserSessionWhereInputObjectSchema).array()]).optional(), OR: z.lazy(() => UserSessionWhereInputObjectSchema).array().optional().optional(), NOT: z.union([z.lazy(() => UserSessionWhereInputObjectSchema),
    z.lazy(() => UserSessionWhereInputObjectSchema).array()]).optional(), createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()])]).optional(), updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.lazy(() => BoolNullableFilterObjectSchema),
    z.boolean(),
    z.null()]).optional().nullable(), userId: z.union([z.lazy(() => StringFilterObjectSchema),
    z.string()]).optional(), expires: z.union([z.lazy(() => DateTimeFilterObjectSchema),
    z.union([z.date(), z.string().datetime().optional()])]).optional(), user: z.union([z.lazy(() => UserItemScalarRelationFilterObjectSchema),
    z.lazy(() => UserItemWhereInputObjectSchema)]).optional()
}).strict() as SchemaType;
