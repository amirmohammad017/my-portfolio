export type Serializable<T> = T extends Date
  ? string
  : T extends (infer U)[]
    ? Serializable<U>[]
    : T extends object
      ? { [K in keyof T]: Serializable<T[K]> }
      : T;

export function toSerializable<T>(value: T): Serializable<T> {
  return JSON.parse(JSON.stringify(value)) as Serializable<T>;
}
