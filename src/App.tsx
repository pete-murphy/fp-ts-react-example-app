import React, { useEffect, useState } from "react"
import { Either, right, left, fold as eitherFold } from "fp-ts/lib/Either"
import { Option, none, some, fold as optionFold } from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import styled from "styled-components"

import { Loading } from "src/components/Loading"
import { ErrorMessage } from "src/components/ErrorMessage"
import { Table } from "src/components/Table"

type FetchData<Err, Data> = Option<Either<Err, Data>>

type AppState = FetchData<string, ReadonlyArray<StateData>>

// State as in United States, not `AppState`
export type StateData = {
  state: string
  totalTestResults: number
  positive: number
}

const Main = styled.main`
  width: 80vw;
  max-width: 50rem;
  margin: 0 auto;
`

const onLoading = () => <Loading />
const onError = (err: string) => <ErrorMessage msg={err} />
const onSuccess = (data: ReadonlyArray<StateData>) => <Table data={data} />

export function App() {
  const [appState, setAppState] = useState<AppState>(none)

  useEffect(() => {
    fetch("https://covidtracking.com/api/states")
      .then((res) => res.json())
      .then((data) => setAppState(some(right(data))))
      .catch(() => setAppState(some(left("Something went wrong"))))
  }, [])

  return (
    <Main>
      <h1>COVID-19 Tracker</h1>
      {pipe(appState, optionFold(onLoading, eitherFold(onError, onSuccess)))}
    </Main>
  )
}
