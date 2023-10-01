import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Row } from '@tanstack/react-table'
import { Animal } from '@/data/baseAnimals.ts'
import { useCallback } from 'react'
import { AnimalClass } from '@/classes/animal.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { useToast } from '@/components/ui/use-toast.ts'

export function DeleteDialog({
  row,
  resetUI,
}: {
  row: Row<Animal>
  resetUI: () => void
}) {
  const removeAnimal = useAnimalsStore((state) => state.removeAnimal)
  const { toast } = useToast()

  const handleAnimalRemove = useCallback(
    (animal: Animal) => {
      try {
        removeAnimal(animal.id)
        const sound = new AnimalClass(animal).makeSound()
        toast({
          title: `Death of ${animal.name}`,
          description: `${animal.name} has perished. Their sound was "${sound}." It will never be heard again.
            `,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: `Animal could not be removed. ${animal.name} is immortal.`,
          variant: 'destructive',
        })
      } finally {
        resetUI()
      }
    },
    [removeAnimal, toast],
  )
  return (
    <DialogContent className={'dark'}>
      <DialogHeader>
        <DialogTitle>
          Are you sure you would like to delete {row.original.name}?
        </DialogTitle>
        <DialogDescription className={'p-4'}>
          Once deleted, {row.original.name} will be gone forever.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          type={'submit'}
          variant={'destructive'}
          onClick={() => {
            handleAnimalRemove(row.original)
          }}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
