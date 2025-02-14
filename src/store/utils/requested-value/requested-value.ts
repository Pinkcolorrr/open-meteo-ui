import { THandledValueStatus } from "./requested-value-status.ts";

export class RequestedValue<T> {
  error: string | Error | null = null;
  status: THandledValueStatus = "uninitialized";
  data: T | null = null;

  constructor(data?: T) {
    if (data) {
      this.data = data;
    }

    /** Initialize as plan object to make it serializable for RTK. */
    return {
      data: this.data,
      error: this.error,
      status: this.status,
    };
  }

  static setLoading<T>(value: RequestedValue<T>) {
    value.status = "loading";
  }

  static onError<T>(value: RequestedValue<T>, error: Error | string) {
    value.status = "error";
    value.error = error;
  }

  static onSuccess<T>(value: RequestedValue<T>, data: T) {
    value.status = "fulfilled";
    value.data = data;
  }
}
