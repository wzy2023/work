/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
;
import type { Prisma } from '@prisma/client';

;
import { OrderDemandSelectObjectSchema } from '../objects/OrderDemandSelect.schema';
;
import { OrderDemandWhereUniqueInputObjectSchema } from '../objects/OrderDemandWhereUniqueInput.schema';
import { OrderDemandWhereInputObjectSchema } from '../objects/OrderDemandWhereInput.schema';
import { OrderDemandOrderByWithRelationInputObjectSchema } from '../objects/OrderDemandOrderByWithRelationInput.schema';
import { OrderDemandScalarFieldEnumSchema } from '../enums/OrderDemandScalarFieldEnum.schema';
import { OrderDemandCreateInputObjectSchema } from '../objects/OrderDemandCreateInput.schema';
import { OrderDemandUncheckedCreateInputObjectSchema } from '../objects/OrderDemandUncheckedCreateInput.schema';
import { OrderDemandCreateManyInputObjectSchema } from '../objects/OrderDemandCreateManyInput.schema';
import { OrderDemandUpdateInputObjectSchema } from '../objects/OrderDemandUpdateInput.schema';
import { OrderDemandUncheckedUpdateInputObjectSchema } from '../objects/OrderDemandUncheckedUpdateInput.schema';
import { OrderDemandUpdateManyMutationInputObjectSchema } from '../objects/OrderDemandUpdateManyMutationInput.schema';
import { OrderDemandUncheckedUpdateManyInputObjectSchema } from '../objects/OrderDemandUncheckedUpdateManyInput.schema';
import { OrderDemandCountAggregateInputObjectSchema } from '../objects/OrderDemandCountAggregateInput.schema';
import { OrderDemandMinAggregateInputObjectSchema } from '../objects/OrderDemandMinAggregateInput.schema';
import { OrderDemandMaxAggregateInputObjectSchema } from '../objects/OrderDemandMaxAggregateInput.schema';
import { OrderDemandOrderByWithAggregationInputObjectSchema } from '../objects/OrderDemandOrderByWithAggregationInput.schema';
import { OrderDemandScalarWhereWithAggregatesInputObjectSchema } from '../objects/OrderDemandScalarWhereWithAggregatesInput.schema'

type OrderDemandInputSchemaType = {
    findUnique: z.ZodType<Prisma.OrderDemandFindUniqueArgs>,
    findFirst: z.ZodType<Prisma.OrderDemandFindFirstArgs>,
    findMany: z.ZodType<Prisma.OrderDemandFindManyArgs>,
    create: z.ZodType<Prisma.OrderDemandCreateArgs>,
    createMany: z.ZodType<Prisma.OrderDemandCreateManyArgs>,
    delete: z.ZodType<Prisma.OrderDemandDeleteArgs>,
    deleteMany: z.ZodType<Prisma.OrderDemandDeleteManyArgs>,
    update: z.ZodType<Prisma.OrderDemandUpdateArgs>,
    updateMany: z.ZodType<Prisma.OrderDemandUpdateManyArgs>,
    upsert: z.ZodType<Prisma.OrderDemandUpsertArgs>,
    aggregate: z.ZodType<Prisma.OrderDemandAggregateArgs>,
    groupBy: z.ZodType<Prisma.OrderDemandGroupByArgs>,
    count: z.ZodType<Prisma.OrderDemandCountArgs>
}

export const OrderDemandInputSchema = {
    findUnique: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), where: OrderDemandWhereUniqueInputObjectSchema
    }).strict(), findFirst: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), where: OrderDemandWhereInputObjectSchema.optional(), orderBy: z.union([OrderDemandOrderByWithRelationInputObjectSchema, OrderDemandOrderByWithRelationInputObjectSchema.array()]).optional(), cursor: OrderDemandWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.array(OrderDemandScalarFieldEnumSchema).optional()
    }).strict(), findMany: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), where: OrderDemandWhereInputObjectSchema.optional(), orderBy: z.union([OrderDemandOrderByWithRelationInputObjectSchema, OrderDemandOrderByWithRelationInputObjectSchema.array()]).optional(), cursor: OrderDemandWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.array(OrderDemandScalarFieldEnumSchema).optional()
    }).strict(), create: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), data: z.union([OrderDemandCreateInputObjectSchema, OrderDemandUncheckedCreateInputObjectSchema])
    }).strict(), createMany: z.object({
        data: z.union([OrderDemandCreateManyInputObjectSchema, z.array(OrderDemandCreateManyInputObjectSchema)]), skipDuplicates: z.boolean().optional()
    }).strict(), 'delete': z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), where: OrderDemandWhereUniqueInputObjectSchema
    }).strict(), deleteMany: z.object({
        where: OrderDemandWhereInputObjectSchema.optional()
    }).strict(), update: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), data: z.union([OrderDemandUpdateInputObjectSchema, OrderDemandUncheckedUpdateInputObjectSchema]), where: OrderDemandWhereUniqueInputObjectSchema
    }).strict(), updateMany: z.object({
        data: z.union([OrderDemandUpdateManyMutationInputObjectSchema, OrderDemandUncheckedUpdateManyInputObjectSchema]), where: OrderDemandWhereInputObjectSchema.optional()
    }).strict(), upsert: z.object({
        select: z.lazy(() => OrderDemandSelectObjectSchema.optional()), where: OrderDemandWhereUniqueInputObjectSchema, create: z.union([OrderDemandCreateInputObjectSchema, OrderDemandUncheckedCreateInputObjectSchema]), update: z.union([OrderDemandUpdateInputObjectSchema, OrderDemandUncheckedUpdateInputObjectSchema])
    }).strict(), aggregate: z.object({
        where: OrderDemandWhereInputObjectSchema.optional(), orderBy: z.union([OrderDemandOrderByWithRelationInputObjectSchema, OrderDemandOrderByWithRelationInputObjectSchema.array()]).optional(), cursor: OrderDemandWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([z.literal(true), OrderDemandCountAggregateInputObjectSchema]).optional(), _min: OrderDemandMinAggregateInputObjectSchema.optional(), _max: OrderDemandMaxAggregateInputObjectSchema.optional()
    }).strict(), groupBy: z.object({
        where: OrderDemandWhereInputObjectSchema.optional(), orderBy: z.union([OrderDemandOrderByWithAggregationInputObjectSchema, OrderDemandOrderByWithAggregationInputObjectSchema.array()]).optional(), having: OrderDemandScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(OrderDemandScalarFieldEnumSchema), _count: z.union([z.literal(true), OrderDemandCountAggregateInputObjectSchema]).optional(), _min: OrderDemandMinAggregateInputObjectSchema.optional(), _max: OrderDemandMaxAggregateInputObjectSchema.optional()
    }).strict(), count: z.object({
        where: OrderDemandWhereInputObjectSchema.optional(), orderBy: z.union([OrderDemandOrderByWithRelationInputObjectSchema, OrderDemandOrderByWithRelationInputObjectSchema.array()]).optional(), cursor: OrderDemandWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.array(OrderDemandScalarFieldEnumSchema).optional(), select: z.union([z.literal(true), OrderDemandCountAggregateInputObjectSchema]).optional()
    }).strict(),
} as OrderDemandInputSchemaType;
