import React, { ReactNode } from "react"

import { StateData } from "src/App"

type TableProps = {
  data: ReadonlyArray<StateData>
}

// Inspired by this tweet: https://twitter.com/fried_brice/status/1229876837829902336
const renderTable = <A extends unknown>(
  cols: ReadonlyArray<[ReactNode, (a: A) => ReactNode]>,
  rows: ReadonlyArray<A>,
): ReactNode => (
  <table>
    <thead>
      <tr>{cols.map((col) => col[0])}</tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr>{cols.map((col) => col[1](row))}</tr>
      ))}
    </tbody>
  </table>
)

export function Table(props: TableProps) {
  return (
    <>
      <h2>State Data</h2>
      {renderTable<StateData>(
        [
          [<th>State</th>, (row) => <td>{row.state}</td>],
          [<th>Total positive</th>, (row) => <td>{row.positive}</td>],
          [
            <th>Total test results</th>,
            (row) => <td>{row.totalTestResults}</td>,
          ],
          [
            <th>Percent positive</th>,
            (row) => {
              const percent = Math.floor(
                (row.positive / row.totalTestResults) * 100,
              )
              return (
                <td
                  style={{
                    backgroundColor:
                      percent >= 40
                        ? "orangered"
                        : percent >= 30
                        ? "darkorange"
                        : percent >= 20
                        ? "yellow"
                        : "transparent",
                  }}
                >
                  {percent}
                </td>
              )
            },
          ],
        ],
        props.data,
      )}
    </>
  )
}
