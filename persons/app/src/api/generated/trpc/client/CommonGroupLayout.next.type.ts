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

        useMutation: <T extends Prisma.CommonGroupLayoutCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommonGroupLayoutCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommonGroupLayoutGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.CommonGroupLayoutGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommonGroupLayoutCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommonGroupLayoutCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommonGroupLayoutGetPayload<T>, Context>) => Promise<Prisma.CommonGroupLayoutGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommonGroupLayoutDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommonGroupLayoutDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommonGroupLayoutDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommonGroupLayoutDeleteManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommonGroupLayoutDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommonGroupLayoutDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommonGroupLayoutGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.CommonGroupLayoutGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommonGroupLayoutDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommonGroupLayoutDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommonGroupLayoutGetPayload<T>, Context>) => Promise<Prisma.CommonGroupLayoutGetPayload<T>>
            };

    };
    findMany: {

        useQuery: <T extends Prisma.CommonGroupLayoutFindManyArgs, TData = Array<Prisma.CommonGroupLayoutGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindManyArgs>,
            opts?: UseTRPCQueryOptions<Array<Prisma.CommonGroupLayoutGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommonGroupLayoutFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Array<Prisma.CommonGroupLayoutGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommonGroupLayoutGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.CommonGroupLayoutFindManyArgs, TData = Array<Prisma.CommonGroupLayoutGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindManyArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Array<Prisma.CommonGroupLayoutGetPayload<T>>, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.CommonGroupLayoutFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindManyArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Array<Prisma.CommonGroupLayoutGetPayload<T>>, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Array<Prisma.CommonGroupLayoutGetPayload<T>>, TRPCClientErrorLike<AppRouter>, T>;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommonGroupLayoutFindUniqueArgs, TData = Prisma.CommonGroupLayoutGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<Prisma.CommonGroupLayoutGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommonGroupLayoutFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Prisma.CommonGroupLayoutGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommonGroupLayoutGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.CommonGroupLayoutFindUniqueArgs, TData = Prisma.CommonGroupLayoutGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindUniqueArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Prisma.CommonGroupLayoutGetPayload<T> | null, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.CommonGroupLayoutFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommonGroupLayoutFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Prisma.CommonGroupLayoutGetPayload<T> | null, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Prisma.CommonGroupLayoutGetPayload<T> | null, TRPCClientErrorLike<AppRouter>, T>;

    };
    update: {

        useMutation: <T extends Prisma.CommonGroupLayoutUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommonGroupLayoutUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommonGroupLayoutGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.CommonGroupLayoutGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommonGroupLayoutUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommonGroupLayoutUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommonGroupLayoutGetPayload<T>, Context>) => Promise<Prisma.CommonGroupLayoutGetPayload<T>>
            };

    };
}
