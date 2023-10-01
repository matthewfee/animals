import { AnimalClass } from '@/classes/animal'
import { useToast } from '@/components/ui/use-toast.ts'
import { Animal } from '@/data/baseAnimals.ts'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import {
  Directions,
  getAdjacentAnimals,
  shouldRunAway,
} from '@/utils/animalRunning'
export const useSound = () => {
  const { toast } = useToast()

  const animals = useAnimalsStore((state) => state.animals)
  const runAway = useAnimalsStore((state) => state.runAway)

  function checkIfAdjacentAnimalsShouldRun(animal: Animal) {
    const { previousAnimal, nextAnimal } = getAdjacentAnimals(animal, animals)
    // only run away if the animal is smaller than the adjacent animal
    // if size is the same, use weight as a tiebreaker

    const animalsThatHaveRunAway: Animal[] = []

    const previousAnimalShouldRunAway = shouldRunAway({
      animal,
      adjacentAnimal: previousAnimal,
      animals,
      direction: Directions.UP,
    })

    if (previousAnimalShouldRunAway) {
      runAway({ animal: previousAnimal!, direction: Directions.UP })
      animalsThatHaveRunAway.push(previousAnimal!)
    }

    const nextAnimalShouldRunAway = shouldRunAway({
      animal,
      adjacentAnimal: nextAnimal,
      animals,
      direction: Directions.DOWN,
    })

    if (nextAnimalShouldRunAway) {
      runAway({ animal: nextAnimal!, direction: Directions.DOWN })
      animalsThatHaveRunAway.push(nextAnimal!)
    }

    return animalsThatHaveRunAway
  }

  function makeSound(animal: Animal) {
    const animalInstance = new AnimalClass(animal)
    const sound = animalInstance.makeSound()
    const runningAnimals = checkIfAdjacentAnimalsShouldRun(animal)

    const soundWithMusic = `♫ ${sound} ♫`
    const animalsThatHaveRunAway = runningAnimals
      .map((animal) => animal.name)
      .join(', ')

    if (animalsThatHaveRunAway) {
      toast({
        title: `${animal.name} scares the other animals!`,
        description: `${soundWithMusic}\n
        The following animals have run away:
        ${animalsThatHaveRunAway} `,
      })
      return
    }

    toast({
      title: animalInstance.name,
      description: `♫ ${sound} ♫`,
    })
  }

  return {
    makeSound,
  }
}
