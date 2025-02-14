interface RequestedState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
}

export function useMergeRequestedStates(...values: RequestedState[]): RequestedState {
  const isSomeLoading = values.some((v) => v.isLoading);
  const isSomeError = values.some((v) => v.isError);
  const isSomeInitialized = values.some((v) => !v.isUninitialized);
  const isAllSuccess = values.every((v) => v.isSuccess);

  return {
    isLoading: isSomeLoading || (!isAllSuccess && isSomeInitialized && !isSomeError),
    isError: isSomeError,
    isSuccess: isAllSuccess,
    isUninitialized: !isSomeInitialized,
  };
}
