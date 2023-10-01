import { Animal } from '@/data/baseAnimals.ts'
import { sortAnimalSize, sortAnimalWeight } from '@/utils/sorting.ts'

// for first and last animals in the array, return the other end of the array
export function getAdjacentAnimals(animal: Animal, animals: Animal[]) {
  const animalIndex = animals.findIndex((a) => a.id === animal.id)
  const isFirstAnimal = animalIndex === 0
  const isLastAnimal = animalIndex === animals.length - 1

  if (isFirstAnimal) {
    return {
      nextAnimal: animals[animalIndex + 1],
    }
  }

  if (isLastAnimal) {
    return {
      previousAnimal: animals[animalIndex - 1],
    }
  }

  const previousAnimal = animals[animalIndex - 1]
  const nextAnimal = animals[animalIndex + 1]

  return {
    previousAnimal,
    nextAnimal,
  }
}

export const Directions = {
  UP: 'up',
  DOWN: 'down',
} as const
export type Direction = (typeof Directions)[keyof typeof Directions]

// animal should run in the direction, swapping places with the animal in that direction
export function runAnimalAway({
  animal,
  direction,
  animals,
}: {
  animal: Animal
  direction: Direction
  animals: Animal[]
}) {
  const { previousAnimal, nextAnimal } = getAdjacentAnimals(animal, animals)
  const animalIndex = animals.findIndex((a) => a.name === animal.name)

  if (direction === Directions.UP && previousAnimal) {
    const previousAnimalIndex = animals.findIndex(
      (a) => a.id === previousAnimal.id,
    )
    const newAnimals = [...animals]
    newAnimals[previousAnimalIndex] = animal
    newAnimals[animalIndex] = previousAnimal
    return newAnimals
  }

  if (direction === Directions.DOWN && nextAnimal) {
    const nextAnimalIndex = animals.findIndex((a) => a.id === nextAnimal.id)
    const newAnimals = [...animals]
    newAnimals[nextAnimalIndex] = animal
    newAnimals[animalIndex] = nextAnimal
    return newAnimals
  }

  return animals
}

export function shouldRunAway({
  animal,
  adjacentAnimal,
  animals,
  direction,
}: {
  animal: Animal
  adjacentAnimal: Animal | undefined
  animals: Animal[]
  direction: Direction
}): boolean {
  if (!adjacentAnimal) {
    return false
  }

  const adjacentIsFirstAnimal = adjacentAnimal.id === animals[0].id
  const adjacentIsLastAnimal =
    adjacentAnimal.id === animals[animals.length - 1].id

  const cannotRunAway =
    (direction === Directions.UP && adjacentIsFirstAnimal) ||
    (direction === Directions.DOWN && adjacentIsLastAnimal)

  if (cannotRunAway) {
    return false
  }

  if (
    direction === Directions.DOWN &&
    animal.id === animals[animals.length - 1].id
  ) {
    return false
  }

  const sizeComparison = sortAnimalSize(animal, adjacentAnimal)
  if (sizeComparison > 0) {
    return true
  } else if (sizeComparison === 0) {
    return sortAnimalWeight(animal, adjacentAnimal) < 0
  }

  return false
}
