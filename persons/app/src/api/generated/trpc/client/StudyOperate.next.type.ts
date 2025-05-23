/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma } from '@prisma/client';
import type { TRPCClientErrorLike, TRPCRequestOptions } from '@trpc/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { AnyTRPCRouter as AnyRouter } from '@trpc/server';
import type { UseTRPCSuspenseQueryOptions, UseTRPCSuspenseQueryResult, UseTRPCSuspenseInfiniteQueryOptions, UseTRPCSuspenseInfiniteQueryResult } from '@trpc/react-query/shared';

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.StudyOperateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StudyOperateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StudyOperateGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.StudyOperateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StudyOperateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StudyOperateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StudyOperateGetPayload<T>, Context>) => Promise<Prisma.StudyOperateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.StudyOperateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StudyOperateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StudyOperateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StudyOperateDeleteManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.StudyOperateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StudyOperateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StudyOperateGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.StudyOperateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StudyOperateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StudyOperateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StudyOperateGetPayload<T>, Context>) => Promise<Prisma.StudyOperateGetPayload<T>>
            };

    };
    findMany: {

        useQuery: <T extends Prisma.StudyOperateFindManyArgs, TData = Array<Prisma.StudyOperateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.StudyOperateFindManyArgs>,
            opts?: UseTRPCQueryOptions<Array<Prisma.StudyOperateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StudyOperateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.StudyOperateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Array<Prisma.StudyOperateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.StudyOperateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.StudyOperateFindManyArgs, TData = Array<Prisma.StudyOperateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.StudyOperateFindManyArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Array<Prisma.StudyOperateGetPayload<T>>, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.StudyOperateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.StudyOperateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Array<Prisma.StudyOperateGetPayload<T>>, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Array<Prisma.StudyOperateGetPayload<T>>, TRPCClientErrorLike<AppRouter>, T>;

    };
    findUnique: {

        useQuery: <T extends Prisma.StudyOperateFindUniqueArgs, TData = Prisma.StudyOperateGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.StudyOperateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<Prisma.StudyOperateGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StudyOperateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StudyOperateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Prisma.StudyOperateGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StudyOperateGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.StudyOperateFindUniqueArgs, TData = Prisma.StudyOperateGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.StudyOperateFindUniqueArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Prisma.StudyOperateGetPayload<T> | null, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.StudyOperateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StudyOperateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Prisma.StudyOperateGetPayload<T> | null, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Prisma.StudyOperateGetPayload<T> | null, TRPCClientErrorLike<AppRouter>, T>;

    };
    update: {

        useMutation: <T extends Prisma.StudyOperateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StudyOperateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StudyOperateGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.StudyOperateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StudyOperateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StudyOperateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StudyOperateGetPayload<T>, Context>) => Promise<Prisma.StudyOperateGetPayload<T>>
            };

    };
}
