'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


import { useActionState } from "react"

async function updateName(newName: string | undefined) {
  try {
    console.log({ newName })
    return null; 
  } catch (error) {
    console.error(error)
    return "Failed to update name"; 
  }
}

export default function Form() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState: string | null, formData: FormData) => {
      const error = await updateName(formData.get("name")?.toString());
      if (error) {
        return error;
      }
      return null;
    },
    null,
  );

  return (
    <form action={submitAction} className="flex flex-col gap-4">
      <Label htmlFor="name">Your name</Label>
      <Input type="name" name="name" id="name" />

      <Button disabled={isPending}>Submit</Button>
      {error && <p>{error}</p>}
    </form>
  )
}