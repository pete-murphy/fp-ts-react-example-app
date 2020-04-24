import { css } from "styled-components"
import { pipe } from "fp-ts/lib/pipeable"

export const tableStyles = css`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 0.5rem 1rem;

  thead,
  tbody,
  tr {
    display: contents;
  }

  th {
    text-align: left;
  }
  td {
    font-family: "SF Mono", monospace;
    font-size: 1.25rem;
  }
`

export const colorFromPercent = (percent: number) => css`
  background-color: rgba(
    255,
    ${pipe(percent * 2.55, (n) => 255 - n, Math.floor)},
    ${pipe(percent * 2.55, (n) => 255 - n, Math.floor)},
    0.5
  );
`

export const tdStyle = css`
  text-align: right;
`
