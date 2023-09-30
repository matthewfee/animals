import { create } from 'zustand'
import { Animal, STARTING_ANIMALS_LIST } from '@/data/baseAnimals.ts'

interface AnimalsStore {
  animals: Animal[]
  addAnimal: (animal: Animal) => void
  removeAnimal: (id: Animal['id']) => void
  removeAllAnimals: () => void
}

export const useAnimalsStore = create<AnimalsStore>((set, get) => ({
  animals: STARTING_ANIMALS_LIST,
  addAnimal: (animal: Animal) => {
    set({ animals: [...get().animals, animal] })
  },
  removeAnimal: (id: Animal['id']) => {
    set({ animals: get().animals.filter((animal) => animal.id !== id) })
  },
  removeAllAnimals: () => {
    set({ animals: [] })
  },
}))
