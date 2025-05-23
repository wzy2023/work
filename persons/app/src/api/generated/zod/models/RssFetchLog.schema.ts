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
    executedAt: z.coerce.date().default(() => new Date()),
    status: z.string(),
    errorMessage: z.string().nullish(),
    itemCount: z.number().default(0),
    triggerType: z.string(),
}
).strict();
const relationSchema = z.object({
    feed: z.record(z.unknown()),
}
);
const fkSchema = z.object({
    feedId: z.string(),
}
);

/**
 * `RssFetchLog` schema excluding foreign keys and relations.
 */
export const RssFetchLogScalarSchema = baseSchema.omit({
    isDeleted: true,
});


/**
 * `RssFetchLog` schema including all fields (scalar, foreign key, and relations) and validations.
 */
export const RssFetchLogSchema = RssFetchLogScalarSchema.merge(fkSchema).merge(relationSchema.partial());


/**
 * Schema used for validating Prisma create input. For internal use only.
 * @private
 */
export const RssFetchLogPrismaCreateSchema = baseSchema.partial().passthrough();


/**
 * Schema used for validating Prisma update input. For internal use only.
 * @private
 */
export const RssFetchLogPrismaUpdateSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().nullish(),
    isDeleted: z.boolean().default(false).nullish(),
    executedAt: z.coerce.date().default(() => new Date()),
    status: z.string(),
    errorMessage: z.string().nullish(),
    itemCount: z.union([z.number().default(0), z.record(z.unknown())]),
    triggerType: z.string()
}).partial().passthrough();


/**
 * `RssFetchLog` schema for create operations excluding foreign keys and relations.
 */
export const RssFetchLogCreateScalarSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true, executedAt: true, itemCount: true
});


/**
 * `RssFetchLog` schema for create operations including scalar fields, foreign key fields, and validations.
 */
export const RssFetchLogCreateSchema = RssFetchLogCreateScalarSchema.merge(fkSchema);


/**
 * `RssFetchLog` schema for update operations excluding foreign keys and relations.
 */
export const RssFetchLogUpdateScalarSchema = baseSchema.partial();


/**
 * `RssFetchLog` schema for update operations including scalar fields, foreign key fields, and validations.
 */
export const RssFetchLogUpdateSchema = RssFetchLogUpdateScalarSchema.merge(fkSchema.partial());

