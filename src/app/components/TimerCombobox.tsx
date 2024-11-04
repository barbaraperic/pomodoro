'use client'

import { Timer } from "./Timer";
import { Combobox } from "./Combobox";
import { useMachine } from '@xstate/react';
import { timerMachine } from '../machines/timerMachine';

export function TimerCombobox() {
    // Create a service instance
  const [state, send] = useMachine(timerMachine);  
  // Get the current state and send function
 console.log(state);

  return (
    <div>
      <Timer />
      {/* <Combobox /> */}
    </div>
  )
}