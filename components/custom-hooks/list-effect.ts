import {
  IResponse,
  ListResponse,
  Paginator,
  RequestOmitPaginator,
} from "@/lib/model";
import { da } from "date-fns/locale";
import { omitBy } from "lodash";
import React from "react";
import { useCallback, useEffect, useState } from "react";

export default function useListEffect<P, T extends ListResponse, U = any>(
  apiFn: (req: P) => Promise<IResponse<ListResponse>>,
  sourceKey: keyof T,
  onlyFresh = true,
  params: Partial<RequestOmitPaginator<P>>
) {
  const [data, setData] = useState<U[]>([]);
  const [paginator, setPaginator] = useState<Paginator>({ limit: 20, page: 1 });
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const stringParams = JSON.stringify(params || {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const request = useCallback(apiFn, []);

  useEffect(() => {
    const req = omitBy(
      { ...paginator, ...(params || {}) },
      (item: string | number | boolean | null) => item === "" || item === null
    ) as any;

    setLoading(true);

    request(req).then((res) => {
      const { data: newData } = res;
      const fresh = newData[sourceKey as string] as unknown as U[];
      const source = onlyFresh ? fresh : [...data, ...fresh];

      setData(source);
      setTotal(newData.total);
      setHasMore(
        onlyFresh
          ? !!source.length && source.length < newData.total
          : newData.total > source.length
      );
      setLoading(false);
    });
  }, [paginator, stringParams]);

  return {
    data,
    hasMore,
    paginator,
    total,
    loading,
    setPaginator,
    setData,
    setTotal,
    setLoading,
  };
}
