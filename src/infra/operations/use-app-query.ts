import { useQuery } from '@tanstack/react-query';

type useFetchDataReturn<TD> = {
  data?: TD;
  isLoading: boolean;
  error: Error | null;
};

type useAppQueryParams<TD> = {
  queryKey: (string | number | undefined | null)[];
  queryFn: () => Promise<TD>;
};

export function useAppQuery<TD>({
  queryKey,
  queryFn,
}: useAppQueryParams<TD>): useFetchDataReturn<TD> {
  const { data, isPending, error } = useQuery<TD, Error, TD>({
    queryKey,
    queryFn,
  });

  return {
    data,
    isLoading: isPending,
    error,
  };
}
