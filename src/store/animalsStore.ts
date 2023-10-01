import { create } from 'zustand'
import { Animal, STARTING_ANIMALS } from '@/data/baseAnimals.ts'
import { Direction } from '@/utils/animalRunning.ts'
import { runAnimalAway } from '@/utils/animalRunning.ts'

interface AnimalsStore {
  animals: Animal[]
  addAnimal: (animal: Animal) => void
  removeAnimal: (id: Animal['id']) => void
  removeAllAnimals: () => void
  runAway: ({
    animal,
    direction,
  }: {
    animal: Animal
    direction: Direction
  }) => void
  fly: ({
    animalToMove,
    destinationAnimal,
  }: {
    animalToMove: Animal
    destinationAnimal: Animal
  }) => void
}

const CHICKEN = STARTING_ANIMALS.find((animal) => animal.name === 'Chicken')
const DUCK = STARTING_ANIMALS.find((animal) => animal.name === 'Duck')

const IMMORTAL_ANIMALS = [CHICKEN, DUCK]
const IMMORTAL_ANIMALS_IDS = IMMORTAL_ANIMALS.map((animal) => animal?.id)

export const useAnimalsStore = create<AnimalsStore>((set, get) => ({
  animals: [...STARTING_ANIMALS],
  addAnimal: (animal: Animal) => {
    set({ animals: [...get().animals, animal] })
  },
  removeAnimal: (id: Animal['id']) => {
    const animal = get().animals.find((animal) => animal.id === id)

    if (!animal || !id) {
      throw new Error(`Animal with id ${id} not found`)
    }

    if (IMMORTAL_ANIMALS_IDS.includes(id)) {
      throw new Error(`${animal.name} is immortal and cannot be removed`)
    }

    set({ animals: get().animals.filter((animal) => animal.id !== id) })
  },
  runAway: ({
    animal,
    direction,
  }: {
    animal: Animal
    direction: Direction
  }) => {
    const newAnimalPositions = runAnimalAway({
      animal,
      direction,
      animals: get().animals,
    })
    set({ animals: newAnimalPositions })
  },
  fly({
    animalToMove,
    destinationAnimal,
  }: {
    animalToMove: Animal
    destinationAnimal: Animal
  }) {
    const animals = get().animals

    const filteredAnimals = animals.filter(
      (animal) => animal.id !== animalToMove.id,
    )

    console.log({
      filteredAnimals,
      filteredAnimalsLength: filteredAnimals.length,
    })

    const indexToInsert = animals.findIndex(
      (a) => a.id === destinationAnimal.id,
    )
    // put the animal in front of the destination animal
    console.log({
      indexToInsert,
      destinationAnimal,
      animalToMove,
    })

    // add the animal to the array at the indexToInsert
    const newAnimals = [
      ...filteredAnimals.slice(0, indexToInsert),
      animalToMove,
      ...filteredAnimals.slice(indexToInsert),
    ]

    console.log({
      newAnimals,
    })

    set({ animals: newAnimals })
  },
  removeAllAnimals: () => {
    set({ animals: [] })
  },
}))
