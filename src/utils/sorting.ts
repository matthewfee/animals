import {
  Animal,
  AnimalSizes,
  AnimalWeights,
  SoundLevels,
} from '@/data/baseAnimals.ts'

export function sortAnimalLoudness(a: Animal, b: Animal): number {
  const loudnessOrder = [
    SoundLevels.QUIET,
    SoundLevels.MEDIUM,
    SoundLevels.LOUD,
    SoundLevels.VERY_LOUD,
  ]
  return loudnessOrder.indexOf(a.loudness) - loudnessOrder.indexOf(b.loudness)
}

export function sortAnimalWeight(a: Animal, b: Animal): number {
  const weightOrder = [
    AnimalWeights.LIGHT,
    AnimalWeights.MEDIUM,
    AnimalWeights.HEAVY,
  ]
  return weightOrder.indexOf(a.weight) - weightOrder.indexOf(b.weight)
}

export function sortAnimalSize(a: Animal, b: Animal): number {
  const sizeOrder = [AnimalSizes.SMALL, AnimalSizes.MEDIUM, AnimalSizes.LARGE]
  return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
}
