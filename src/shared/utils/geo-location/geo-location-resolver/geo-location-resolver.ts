import { GeoLocation } from "@shared/utils/geo-location";
import { AppDispatch } from "@store/store.ts";

export abstract class GeoLocationResolver {
  protected readonly dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  abstract resolve(): Promise<GeoLocation | null>;
}
