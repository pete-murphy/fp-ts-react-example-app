declare module "fp-ts/lib/HKT" {
  interface URItoKind2<E, A> {
    readonly FetchData: FetchData<E, A>
  }
}

export const URI = "FetchData"

export type URI = typeof URI

export interface Pending {
  readonly _tag: "Pending"
}

export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

export type FetchData<E, A> = Pending | Failure<E> | Success<A>

export const pending: FetchData<never, never> = { _tag: "Pending" }

export function failure<E = never, A = never>(e: E): FetchData<E, A> {
  return { _tag: "Failure", failure: e }
}

export function success<E = never, A = never>(a: A): FetchData<E, A> {
  return { _tag: "Success", success: a }
}
