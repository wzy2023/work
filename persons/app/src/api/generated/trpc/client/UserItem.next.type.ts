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

        useMutation: <T extends Prisma.UserItemCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserItemCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserItemGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.UserItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserItemCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserItemCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserItemGetPayload<T>, Context>) => Promise<Prisma.UserItemGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.UserItemDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserItemDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserItemDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserItemDeleteManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.UserItemDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserItemDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserItemGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.UserItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserItemDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserItemDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserItemGetPayload<T>, Context>) => Promise<Prisma.UserItemGetPayload<T>>
            };

    };
    findMany: {

        useQuery: <T extends Prisma.UserItemFindManyArgs, TData = Array<Prisma.UserItemGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.UserItemFindManyArgs>,
            opts?: UseTRPCQueryOptions<Array<Prisma.UserItemGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserItemFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserItemFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Array<Prisma.UserItemGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.UserItemGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.UserItemFindManyArgs, TData = Array<Prisma.UserItemGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.UserItemFindManyArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Array<Prisma.UserItemGetPayload<T>>, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.UserItemFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserItemFindManyArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Array<Prisma.UserItemGetPayload<T>>, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Array<Prisma.UserItemGetPayload<T>>, TRPCClientErrorLike<AppRouter>, T>;

    };
    findUnique: {

        useQuery: <T extends Prisma.UserItemFindUniqueArgs, TData = Prisma.UserItemGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.UserItemFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<Prisma.UserItemGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserItemFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UserItemFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Prisma.UserItemGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserItemGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.UserItemFindUniqueArgs, TData = Prisma.UserItemGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.UserItemFindUniqueArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Prisma.UserItemGetPayload<T> | null, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.UserItemFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UserItemFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Prisma.UserItemGetPayload<T> | null, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Prisma.UserItemGetPayload<T> | null, TRPCClientErrorLike<AppRouter>, T>;

    };
    update: {

        useMutation: <T extends Prisma.UserItemUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserItemUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserItemGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.UserItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserItemUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserItemUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserItemGetPayload<T>, Context>) => Promise<Prisma.UserItemGetPayload<T>>
            };

    };
}
