import { of, fromIO, chain } from "./Aff"
import { pipe } from "fp-ts/lib/pipeable"

function getLoggers(logs: Array<string | number>) {
  const log = (s: string | number) => () => {
    logs.push(s)
  }
  const error = (e: Error) => log(e.message)
  return { log, error }
}

describe("Aff", () => {
  it("of", () => {
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)
    const aff1 = of("a")
    aff1(error, log)
    expect(logs).toEqual(["a"])
  })

  it("chain", () => {
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)
    const aff1 = pipe(
      of("a"),
      chain(() => of(1)),
    )
    aff1(error, log)
    expect(logs).toEqual([1])

    let counter = 0
    const aff2 = fromIO(() => {
      counter += 1
      return "a"
    })
    const aff3 = fromIO(() => {
      counter += 1
      return "b"
    })
    const aff4 = pipe(
      aff2,
      chain(() => aff3),
    )
    aff4(error, log)
    expect(counter).toEqual(2)
    expect(logs).toEqual([1, "b"])
  })

  it("fromIO", () => {
    let counter = 0
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)

    const aff1 = fromIO(() => {
      counter += 1
      return "a"
    })

    expect(counter).toEqual(0)
    expect(logs).toEqual([])

    aff1(error, log)

    expect(counter).toEqual(1)
    expect(logs).toEqual(["a"])

    const aff2 = fromIO(() => {
      throw new Error("ouch")
    })

    aff2(error, log)

    expect(counter).toEqual(1)
    expect(logs).toEqual(["a", "ouch"])
  })
})
