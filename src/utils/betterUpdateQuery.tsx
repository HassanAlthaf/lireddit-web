import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  // @ts-ignore
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  // @ts-ignore
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}
