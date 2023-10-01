import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useCallback, useState } from 'react'
import { Animal } from '@/data/baseAnimals.ts'
import { AnimalClass } from '@/classes/animal.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { useToast } from '../ui/use-toast'
import { Row } from '@tanstack/react-table'

export function FlightDialog({
  row,
  resetUI,
}: {
  row: Row<Animal>
  resetUI: () => void
}) {
  const animals = useAnimalsStore((state) => state.animals)
  const fly = useAnimalsStore((state) => state.fly)

  const [animalIdToFlyTo, setAnimalIdToFlyTo] = useState<
    Animal['id'] | undefined
  >(undefined)

  const { toast } = useToast()

  const handleAnimalFly = useCallback(
    ({
      animal,
      destinationAnimalId,
    }: {
      animal: Animal
      destinationAnimalId: Animal['id'] | undefined
    }) => {
      if (!destinationAnimalId) return
      const destinationAnimal = animals.find(
        (animal) => animal.id === destinationAnimalId,
      ) as Animal

      fly({
        animalToMove: animal,
        destinationAnimal,
      })

      const destinationAnimalSound = new AnimalClass(
        destinationAnimal,
      ).makeSound()
      const animalSound = new AnimalClass(animal).makeSound()

      toast({
        title: `Flight of ${animal.name}`,
        description: `${animal.name} has flown to ${destinationAnimal.name}. ♫ ${animalSound} ♫ ${destinationAnimalSound} ♫. Looks like they are best friends!`,
      })

      resetUI()
    },
    [animals, fly, resetUI],
  )
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{row.original.name} can fly!</DialogTitle>
        <DialogDescription className={'flex flex-col gap-4 p-4'}>
          <div className={'mb-4'}>
            {row.original.name} can fly! Which animal would you like to visit?
          </div>
          <Select value={animalIdToFlyTo} onValueChange={setAnimalIdToFlyTo}>
            <SelectTrigger>
              <SelectValue placeholder={'Select an animal'} />
            </SelectTrigger>
            <SelectContent className={'max-h-40'}>
              {animals
                .filter((animal) => animal.id !== row.original.id)
                .map((animal) => (
                  <SelectItem value={animal?.id} key={animal.id}>
                    {animal.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </DialogDescription>
        <DialogFooter className={'flex justify-end gap-2'}>
          <Button
            variant={'ghost'}
            onClick={() => {
              handleAnimalFly({
                animal: row.original,
                destinationAnimalId: animalIdToFlyTo,
              })
            }}
            disabled={!animalIdToFlyTo}
          >
            Fly
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  )
}
