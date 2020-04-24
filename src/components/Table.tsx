import React from "react"
import { fold } from "fp-ts/lib/Monoid"
import "styled-components/macro"

import { StateData } from "src/App"
import { renderTable } from "src/lib/renderTable"
import { monoidCss } from "src/lib/Monoid"
import {
  tableStyles,
  tdStyle,
  colorFromPercent,
} from "src/components/Table.styles"

type TableProps = {
  data: ReadonlyArray<StateData>
}

export function Table(props: TableProps) {
  return (
    <>
      <h2>State Data</h2>
      <table css={tableStyles}>
        {renderTable<StateData>(
          [
            [<th>State</th>, (row) => <td>{row.state}</td>],
            [
              <th>Total positive</th>,
              (row) => <td css={tdStyle}>{row.positive.toLocaleString()}</td>,
            ],
            [
              <th>Total test results</th>,
              (row) => (
                <td css={tdStyle}>{row.totalTestResults.toLocaleString()}</td>
              ),
            ],
            [
              <th>Percent positive</th>,
              (row) => {
                const percent =
                  Math.floor((row.positive / row.totalTestResults) * 1000) / 10
                return (
                  <td
                    css={fold(monoidCss)([colorFromPercent(percent), tdStyle])}
                  >
                    {percent.toFixed(1)}%
                  </td>
                )
              },
            ],
          ],
          props.data,
        )}
      </table>
    </>
  )
}
