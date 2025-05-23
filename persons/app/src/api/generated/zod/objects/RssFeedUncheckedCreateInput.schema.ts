/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { RssItemUncheckedCreateNestedManyWithoutFeedInputObjectSchema } from './RssItemUncheckedCreateNestedManyWithoutFeedInput.schema';
import { RssFetchLogUncheckedCreateNestedManyWithoutFeedInputObjectSchema } from './RssFetchLogUncheckedCreateNestedManyWithoutFeedInput.schema';

import type { Prisma } from '@prisma/client';


const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema.nullable()), z.record(jsonSchema.nullable())])
);

type SchemaType = z.ZodType<Prisma.RssFeedUncheckedCreateInput>;
export const RssFeedUncheckedCreateInputObjectSchema: SchemaType = z.object({
    id: z.string().optional().optional(), createdAt: z.union([z.date().optional(), z.string().datetime().optional()]).optional(), updatedAt: z.union([z.union([z.date(), z.string().datetime().optional()]),
    z.null()]).optional().nullable(), isDeleted: z.union([z.boolean(),
    z.null()]).optional().nullable(), name: z.string(), url: z.string(), tags: z.union([z.lazy(() => JsonNullValueInputSchema),
        jsonSchema]), description: z.union([z.string(),
        z.null()]).optional().nullable(), frequency: z.string(), enabled: z.boolean().optional().optional(), items: z.lazy(() => RssItemUncheckedCreateNestedManyWithoutFeedInputObjectSchema).optional().optional(), logs: z.lazy(() => RssFetchLogUncheckedCreateNestedManyWithoutFeedInputObjectSchema).optional().optional()
}).strict() as SchemaType;
