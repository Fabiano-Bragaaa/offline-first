import { useMutation } from '@tanstack/react-query';

export type useAppMutationOptions<TD> = {
  onSuccess: (data: TD) => void;
  onError: (error: Error) => void;
};

type useAppMutationReturn<TD, TV> = {
  mutate: (variables: TV) => TD | void;
  isLoading: boolean;
  error: Error | null;
};

type useAppMutationParams<TD, TV> = {
  mutationFn: (variables: TV) => Promise<TD>;
} & useAppMutationOptions<TD>;

export function useAppMutation<TD, TV>({
  mutationFn,
  onSuccess,
  onError,
}: useAppMutationParams<TD, TV>): useAppMutationReturn<TD, TV> {
  const { mutate, isPending, error } = useMutation<TD, Error, TV>({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    mutate,
    isLoading: isPending,
    error,
  };
}
