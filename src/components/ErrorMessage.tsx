import React from "react"

type ErrorMessageProps = {
  msg: string
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <h2
      style={{
        color: "tomato",
      }}
    >
      {props.msg}
    </h2>
  )
}
