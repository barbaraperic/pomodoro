"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMachine } from '@xstate/react';
import { timerMachine } from '../machines/timerMachine';

const times = [
  {
    value: "60",
    label: "60",
  },
  {
    value: "45",
    label: "45",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "25",
    label: "25",
  },
]


export function Combobox() {
  const [open, setOpen] = React.useState(false)

  const [state, send] = useMachine(timerMachine);  

  const value = state.context.timer.toString()


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? times.find((time) => time.value === value)?.label
            : "Select time"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {times.map((time) => (
                <CommandItem
                  key={time.value}
                  value={time.value}
                  onSelect={(currentValue: string) => {
                    send({ type: 'timer.value', value: currentValue});
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === time.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {time.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
