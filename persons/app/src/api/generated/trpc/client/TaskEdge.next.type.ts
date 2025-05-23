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

        useMutation: <T extends Prisma.TaskEdgeCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskEdgeCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskEdgeGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.TaskEdgeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskEdgeCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskEdgeCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskEdgeGetPayload<T>, Context>) => Promise<Prisma.TaskEdgeGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TaskEdgeDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskEdgeDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskEdgeDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskEdgeDeleteManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TaskEdgeDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskEdgeDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskEdgeGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.TaskEdgeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskEdgeDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskEdgeDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskEdgeGetPayload<T>, Context>) => Promise<Prisma.TaskEdgeGetPayload<T>>
            };

    };
    findMany: {

        useQuery: <T extends Prisma.TaskEdgeFindManyArgs, TData = Array<Prisma.TaskEdgeGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TaskEdgeFindManyArgs>,
            opts?: UseTRPCQueryOptions<Array<Prisma.TaskEdgeGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskEdgeFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TaskEdgeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Array<Prisma.TaskEdgeGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TaskEdgeGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.TaskEdgeFindManyArgs, TData = Array<Prisma.TaskEdgeGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TaskEdgeFindManyArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Array<Prisma.TaskEdgeGetPayload<T>>, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.TaskEdgeFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TaskEdgeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Array<Prisma.TaskEdgeGetPayload<T>>, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Array<Prisma.TaskEdgeGetPayload<T>>, TRPCClientErrorLike<AppRouter>, T>;

    };
    findUnique: {

        useQuery: <T extends Prisma.TaskEdgeFindUniqueArgs, TData = Prisma.TaskEdgeGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.TaskEdgeFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<Prisma.TaskEdgeGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskEdgeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskEdgeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<T, Prisma.TaskEdgeGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TaskEdgeGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>,
            T
        >;
        useSuspenseQuery: <T extends Prisma.TaskEdgeFindUniqueArgs, TData = Prisma.TaskEdgeGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.TaskEdgeFindUniqueArgs>,
            opts?: UseTRPCSuspenseQueryOptions<Prisma.TaskEdgeGetPayload<T> | null, TData, Error>
        ) => UseTRPCSuspenseQueryResult<TData, TRPCClientErrorLike<AppRouter>>;
        useSuspenseInfiniteQuery: <T extends Prisma.TaskEdgeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskEdgeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCSuspenseInfiniteQueryOptions<T, Prisma.TaskEdgeGetPayload<T> | null, Error>
        ) => UseTRPCSuspenseInfiniteQueryResult<Prisma.TaskEdgeGetPayload<T> | null, TRPCClientErrorLike<AppRouter>, T>;

    };
    update: {

        useMutation: <T extends Prisma.TaskEdgeUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskEdgeUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskEdgeGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.TaskEdgeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskEdgeUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskEdgeUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskEdgeGetPayload<T>, Context>) => Promise<Prisma.TaskEdgeGetPayload<T>>
            };

    };
}
