import {
  AnimalSizes,
  AnimalWeights,
  STARTING_ANIMALS_LIST,
} from '@/data/baseAnimals.ts'
import { ANIMAL_DESCRIPTIONS } from '@/constants/animalDescriptions.ts'
import { getRandom, replaceRandomVowels } from '@/utils/random.ts'
import { generateRandomSound } from '@/utils/randomSound.ts'
import { v4 as uuidv4 } from 'uuid'

export function randomAnimalName() {
  const animalNames = STARTING_ANIMALS_LIST.map((animal) => animal.name)
  const randomAnimal = getRandom(animalNames)
  const randomAnimalWithVowelChanged = replaceRandomVowels(randomAnimal)
  const randomDescription = getRandom(ANIMAL_DESCRIPTIONS)
  return `${randomDescription} ${randomAnimalWithVowelChanged}`
}

export function randomAnimal() {
  const animal = getRandom(STARTING_ANIMALS_LIST)
  const size = getRandom(Object.values(AnimalSizes))
  const weight = getRandom(Object.values(AnimalWeights))
  const sound = generateRandomSound()
  const name = randomAnimalName()

  return {
    ...animal,
    id: uuidv4(),
    name,
    size,
    weight,
    sound,
  }
}
