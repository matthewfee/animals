import { create } from 'zustand'
import { Animal, STARTING_ANIMALS } from '@/data/baseAnimals.ts'

interface AnimalsStore {
  animals: Animal[]
  addAnimal: (animal: Animal) => void
  removeAnimal: (id: Animal['id']) => void
  removeAllAnimals: () => void
}

export const useAnimalsStore = create<AnimalsStore>((set, get) => ({
  animals: [...STARTING_ANIMALS],
  addAnimal: (animal: Animal) => {
    set({ animals: [...get().animals, animal] })
  },
  removeAnimal: (id: Animal['id']) => {
    const animal = get().animals.find((animal) => animal.id === id)
    console.log('animal', animal, 'id', id)
    if (!animal || !id) {
      throw new Error(`Animal with id ${id} not found`)
    }
    set({ animals: get().animals.filter((animal) => animal.id !== id) })
  },
  removeAllAnimals: () => {
    set({ animals: [] })
  },
}))
