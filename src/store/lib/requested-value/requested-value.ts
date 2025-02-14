import { QueryStatus } from "@reduxjs/toolkit/query";

export class RequestedValue<T> {
  error?: string | Error | null;
  status: QueryStatus = QueryStatus.uninitialized;
  data: T | null = null;

  isLoading: boolean = false;
  isError: boolean = false;
  isUninitialized = true;
  isSuccess = true;

  constructor(data?: T) {
    if (data) {
      this.data = data;
    }

    /** Initialize as plan object to make it serializable for RTK. */
    return {
      data: this.data,
      error: this.error,
      status: this.status,
      isLoading: this.isLoading,
      isError: this.isError,
      isUninitialized: this.isUninitialized,
      isSuccess: this.isSuccess,
    };
  }

  static setLoading<T>(value: RequestedValue<T>) {
    value.status = QueryStatus.pending;
    value.isLoading = true;
    value.isSuccess = false;
    value.isError = false;
    value.isUninitialized = false;
  }

  static onError<T>(value: RequestedValue<T>, error: Error | string) {
    value.status = QueryStatus.rejected;
    value.error = error;
    value.isError = true;
    value.isLoading = false;
    value.isUninitialized = false;
    value.isSuccess = false;
  }

  static onSuccess<T>(value: RequestedValue<T>, data: T) {
    value.status = QueryStatus.fulfilled;
    value.data = data;
    value.isSuccess = true;
    value.isLoading = false;
    value.isError = false;
    value.isUninitialized = false;
  }
}
