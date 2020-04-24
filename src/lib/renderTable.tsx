import React, { cloneElement, ReactElement } from "react"

// Inspired by this tweet: https://twitter.com/fried_brice/status/1229876837829902336
export const renderTable = <A extends unknown>(
  cols: ReadonlyArray<[ReactElement, (a: A) => ReactElement]>,
  rows: ReadonlyArray<A>,
): ReactElement => (
  <>
    <thead>
      <tr>
        {cols.map(([heading, _], i) =>
          cloneElement(heading, { key: `heading-${i}` }),
        )}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={`row-${i}`}>
          {cols.map(([_, renderRow], j) =>
            cloneElement(renderRow(row), { key: `cell-${j}-${i}` }),
          )}
        </tr>
      ))}
    </tbody>
  </>
)
