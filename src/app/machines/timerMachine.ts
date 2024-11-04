import { assign, setup } from 'xstate';

export const timerMachine = setup({
  types: {
    context: {} as { timer: number, timeLeft: number, isBreak: boolean },
    events: {} as

      | { type: 'START' }
      | {
          type: 'PAUSE';
        }
      | {
          type: 'TICK';
        }
      | {
          type: 'CLOSE';
        }
      | { type: 'RESET' }
      | {
          type: 'timer.value';
          value: string;
        }
  },
  actions: {
    timeout: ({ self }) => {
      const interval = setInterval(() => {
        self.send({ type: 'TICK' })
      }, 1000)
      return () => clearInterval(interval)
    }
  },
}).createMachine({
  id: 'timer',
  initial: 'idle',
  context: {
    timer: null,
    timeLeft: 25 * 60,
    isBreak: false
  },
  states: {
    idle: {
      on: {
        "timer.value": {
          actions: assign({
            timer: ({ event }) => parseInt(event.value, 10)
          })
        },
        START: {
          target: 'active'
        },
      }
    },
    active: {
      entry: 'timeout',
      on: {
        PAUSE: {
          target: 'idle' 
        },
        TICK: {
          actions: assign({
            timeLeft: ({ context }) => context.timeLeft - 1
          })
        },
        RESET: {
          actions: assign({
            timeLeft: ({ context }) => context.timer
          })
        }
      }
    },
    break: {},
    closed: {
      on: {
        RESET: {
          target: 'idle',
          actions: assign({
            timeLeft: ({ context }) => context.timer
          })
        }
      }
    }
  },
  on: {
    CLOSE: '.closed'
  }
});
