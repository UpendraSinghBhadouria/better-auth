"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type ServerFn<Params, Result> = Params extends void
  ? () => Promise<Result>
  : (params: Params, signal: AbortSignal) => Promise<Result>;

interface UseServerActionOptions<Params> {
  method?: Method;
  params?: Params;
  auto?: boolean;
}

export const useServerAction = <Result, Params = void>(
  serverFunction: ServerFn<Params, Result>,
  options?: UseServerActionOptions<Params>
) => {
  const { method = "GET", params, auto = method === "GET" } = options ?? {};

  const [data, setData] = useState<Result | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  const run = useCallback(
    async (overrideParams?: Params): Promise<Result> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const result =
          params === undefined && overrideParams === undefined
            ? (serverFunction as () => Promise<Result>)()
            : (
                serverFunction as (p: Params, s: AbortSignal) => Promise<Result>
              )((overrideParams ?? params) as Params, controller.signal);

        const resolved = await result;

        if (mountedRef.current) {
          setData(resolved);
        }

        return resolved;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          if (mountedRef.current) {
            setError(err as Error);
          }
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [serverFunction, params]
  );

  /* semantic wrappers */
  const fetch = method === "GET" ? run : undefined;
  const create = method === "POST" ? run : undefined;
  const update = method === "PUT" ? run : undefined;
  const remove = method === "DELETE" ? run : undefined;

  const refetch = method === "GET" ? () => run() : undefined;

  useEffect(() => {
    if (auto && method === "GET") {
      run();
    }
  }, [auto, method, run]);

  return {
    data,
    error,
    isLoading,
    fetch,
    refetch,
    create,
    update,
    remove,
    abort: () => abortRef.current?.abort(),
  };
};
