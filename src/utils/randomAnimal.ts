import { AnimalSizes, AnimalWeights } from '@/data/baseAnimals.ts'
import { ANIMAL_DESCRIPTIONS } from '@/constants/animalDescriptions.ts'
import {
  flipCoin,
  getRandom,
  replaceRandomConsonants,
  replaceRandomVowels,
} from '@/utils/random.ts'
import { generateRandomSound } from '@/utils/randomSound.ts'
import { v4 as uuidv4 } from 'uuid'
import { STARTING_ANIMALS } from '@/data/baseAnimals.ts'

export function randomAnimalName(baseAnimalName: string) {
  const randomDescription = getRandom(ANIMAL_DESCRIPTIONS)
  const coinFlip = flipCoin()
  const name = coinFlip
    ? replaceRandomVowels(baseAnimalName)
    : replaceRandomConsonants(baseAnimalName)

  return `${randomDescription} ${name}`
}

export function randomAnimal() {
  const animal = getRandom(STARTING_ANIMALS)
  const size = getRandom(Object.values(AnimalSizes))
  const weight = getRandom(Object.values(AnimalWeights))
  const sound = generateRandomSound(animal.sound)
  const name = randomAnimalName(animal.name)

  return {
    ...animal,
    id: uuidv4(),
    name,
    size,
    weight,
    sound,
  }
}
