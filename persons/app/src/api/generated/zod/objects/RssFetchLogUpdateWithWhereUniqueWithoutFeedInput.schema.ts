/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { z } from 'zod';
import { RssFetchLogWhereUniqueInputObjectSchema } from './RssFetchLogWhereUniqueInput.schema';
import { RssFetchLogUpdateWithoutFeedInputObjectSchema } from './RssFetchLogUpdateWithoutFeedInput.schema';
import { RssFetchLogUncheckedUpdateWithoutFeedInputObjectSchema } from './RssFetchLogUncheckedUpdateWithoutFeedInput.schema';

import type { Prisma } from '@prisma/client';

type SchemaType = z.ZodType<Prisma.RssFetchLogUpdateWithWhereUniqueWithoutFeedInput>;
export const RssFetchLogUpdateWithWhereUniqueWithoutFeedInputObjectSchema: SchemaType = z.object({
    where: z.lazy(() => RssFetchLogWhereUniqueInputObjectSchema), data: z.union([z.lazy(() => RssFetchLogUpdateWithoutFeedInputObjectSchema), z.lazy(() => RssFetchLogUncheckedUpdateWithoutFeedInputObjectSchema)])
}).strict() as SchemaType;
