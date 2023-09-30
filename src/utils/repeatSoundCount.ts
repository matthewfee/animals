import { AnimalSize, AnimalSizes } from '@/data/baseAnimals.ts'

// small animals are more verbose than large animals
export function timesToRepeatSound(animalSize: AnimalSize) {
  switch (animalSize) {
    case AnimalSizes.SMALL:
      return 5
    case AnimalSizes.MEDIUM:
      return 3
    case AnimalSizes.LARGE:
      return 1
  }
}
