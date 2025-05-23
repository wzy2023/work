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
    name: z.string(),
    contentType: z.string(),
    viewType: z.string(),
    input: z.string().nullish(),
    output: z.string(),
    model: z.string().nullish(),
    prompt: z.string().nullish(),
}
).strict();

/**
 * `StudyOperate` schema excluding foreign keys and relations.
 */
export const StudyOperateScalarSchema = baseSchema.omit({
    isDeleted: true,
});


/**
 * `StudyOperate` schema including all fields (scalar, foreign key, and relations) and validations.
 */
export const StudyOperateSchema = StudyOperateScalarSchema;


/**
 * Schema used for validating Prisma create input. For internal use only.
 * @private
 */
export const StudyOperatePrismaCreateSchema = baseSchema.partial().passthrough();


/**
 * Schema used for validating Prisma update input. For internal use only.
 * @private
 */
export const StudyOperatePrismaUpdateSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().nullish(),
    isDeleted: z.boolean().default(false).nullish(),
    name: z.string(),
    contentType: z.string(),
    viewType: z.string(),
    input: z.string().nullish(),
    output: z.string(),
    model: z.string().nullish(),
    prompt: z.string().nullish()
}).partial().passthrough();


/**
 * `StudyOperate` schema for create operations excluding foreign keys and relations.
 */
export const StudyOperateCreateScalarSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true
});


/**
 * `StudyOperate` schema for create operations including scalar fields, foreign key fields, and validations.
 */
export const StudyOperateCreateSchema = baseSchema.partial({
    id: true, createdAt: true, updatedAt: true, isDeleted: true
});


/**
 * `StudyOperate` schema for update operations excluding foreign keys and relations.
 */
export const StudyOperateUpdateScalarSchema = baseSchema.partial();


/**
 * `StudyOperate` schema for update operations including scalar fields, foreign key fields, and validations.
 */
export const StudyOperateUpdateSchema = StudyOperateUpdateScalarSchema;

