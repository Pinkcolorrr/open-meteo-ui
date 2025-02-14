export interface PersistentMeta<T = unknown> {
  persistent: boolean;
  key: string;
  dataToPersist: T;
}
