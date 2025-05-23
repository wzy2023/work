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
    sessionToken: z.string(),
    expires: z.coerce.date(),
}
).strict();
const relationSchema = z.object({
    user: z.record(z.unknown()),
}
);
const fkSchema = z.object({
    userId: z.string(),
}
);

/**
 * `UserSession` schema excluding foreign keys and relations.
 */
export const UserSessionScalarSchema = baseSchema.omit({
    isDeleted: true,
});


/**
 * `UserSession` schema including all fields (scalar, foreign key, and relations) and validations.
 */
export const UserSessionSchema = UserSessionScalarSchema.merge(fkSchema).merge(relationSchema.partial());


/**
 * Schema used for validating Prisma create input. For internal use only.
 * @private
 */
export const UserSessionPrismaCreateSchema = baseSchema.partial().passthrough();


/**
 * Schema used for validating Prisma update input. For internal use only.
 * @private
 */
export const UserSessionPrismaUpdateSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().nullish(),
    isDeleted: z.boolean().default(false).nullish(),
    sessionToken: z.string(),
    expires: z.coerce.date()
}).partial().passthrough();


/**
 * `UserSession` schema for create operations excluding foreign keys and relations.
 */
export const UserSessionCreateScalarSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true
});


/**
 * `UserSession` schema for create operations including scalar fields, foreign key fields, and validations.
 */
export const UserSessionCreateSchema = UserSessionCreateScalarSchema.merge(fkSchema);


/**
 * `UserSession` schema for update operations excluding foreign keys and relations.
 */
export const UserSessionUpdateScalarSchema = baseSchema.partial();


/**
 * `UserSession` schema for update operations including scalar fields, foreign key fields, and validations.
 */
export const UserSessionUpdateSchema = UserSessionUpdateScalarSchema.merge(fkSchema.partial());

