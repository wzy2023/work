/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { db } from ".";
import { createTRPCRouter } from "@/api/trpc/trpc";
import { procedure } from "@/api/trpc/procedures";
import * as _Schema from '@/api/generated/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter() {
    return createTRPCRouter({

        create: procedure.input($Schema.StudyItemInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).studyItem.create(input as any))),

        deleteMany: procedure.input($Schema.StudyItemInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).studyItem.deleteMany(input as any))),

        delete: procedure.input($Schema.StudyItemInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).studyItem.delete(input as any))),

        findMany: procedure.input($Schema.StudyItemInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).studyItem.findMany(input as any))),

        findUnique: procedure.input($Schema.StudyItemInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).studyItem.findUnique(input as any))),

        update: procedure.input($Schema.StudyItemInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).studyItem.update(input as any))),

    }
    );
}
