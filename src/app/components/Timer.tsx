'use client'

import { useEffect } from "react"
import { useMachine } from '@xstate/react';
import { timerMachine } from '../machines/timerMachine';
import { formatTime } from "../utils/formatTimerTime";

export function Timer() {

  const [state, send] = useMachine(timerMachine);

  const { timeLeft } = state.context
  const stateValue  = state.value

  console.log({state});

  useEffect(() => {
    if (stateValue === 'active') {
      const timer = setInterval(() => {
        send({ type: 'TICK'})
      }, 1000)

      return () => clearInterval(timer)
    }

  }, [stateValue, send])




  const buttonText = {
    active: 'Pause',
    idle: 'Work'
  }[stateValue]

  return (
    <div>
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={() => send({ type: 'START'})}>{buttonText}</button>
      {/* <button onClick={() => send({ type: 'RESET'})}>Reset</button> */}
    </div>
  )
}