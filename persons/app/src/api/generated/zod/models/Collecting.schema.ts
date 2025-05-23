/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
const baseSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().nullish(),
    isDeleted: z.boolean().default(false).nullish(),
    type: z.string(),
    title: z.string(),
    description: z.string().nullish(),
    content: z.string(),
    tags: z.any(),
    images: z.any().nullish(),
}
).strict();

/**
 * `Collecting` schema excluding foreign keys and relations.
 */
export const CollectingScalarSchema = baseSchema.omit({
    isDeleted: true,
});


/**
 * `Collecting` schema including all fields (scalar, foreign key, and relations) and validations.
 */
export const CollectingSchema = CollectingScalarSchema;


/**
 * Schema used for validating Prisma create input. For internal use only.
 * @private
 */
export const CollectingPrismaCreateSchema = baseSchema.partial().passthrough();


/**
 * Schema used for validating Prisma update input. For internal use only.
 * @private
 */
export const CollectingPrismaUpdateSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().nullish(),
    isDeleted: z.boolean().default(false).nullish(),
    type: z.string(),
    title: z.string(),
    description: z.string().nullish(),
    content: z.string(),
    tags: z.any(),
    images: z.any().nullish()
}).partial().passthrough();


/**
 * `Collecting` schema for create operations excluding foreign keys and relations.
 */
export const CollectingCreateScalarSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true
});


/**
 * `Collecting` schema for create operations including scalar fields, foreign key fields, and validations.
 */
export const CollectingCreateSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true
});


/**
 * `Collecting` schema for update operations excluding foreign keys and relations.
 */
export const CollectingUpdateScalarSchema = baseSchema.partial();


/**
 * `Collecting` schema for update operations including scalar fields, foreign key fields, and validations.
 */
export const CollectingUpdateSchema = CollectingUpdateScalarSchema;

