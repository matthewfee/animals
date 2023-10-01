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

export async function getRandomDescription() {
  let randomDescription = ''
  try {
    const response = await fetch(
      'https://random-word-form.repl.co/random/adjective',
    )
    const data = await response.json()
    randomDescription = data[0]
  } catch (error) {
    console.error(error)
    randomDescription = getRandom(ANIMAL_DESCRIPTIONS)
  }
  return randomDescription
}

export async function randomAnimalName(baseAnimalName: string) {
  const randomDescription = await getRandomDescription()

  const capitalizedDescription =
    randomDescription.charAt(0).toUpperCase() + randomDescription.slice(1)

  const coinFlip = flipCoin()
  const name = coinFlip
    ? replaceRandomVowels(baseAnimalName)
    : replaceRandomConsonants(baseAnimalName)

  return `${capitalizedDescription} ${name}`
}

export async function randomAnimal() {
  const animal = getRandom(STARTING_ANIMALS)
  const size = getRandom(Object.values(AnimalSizes))
  const weight = getRandom(Object.values(AnimalWeights))
  const sound = generateRandomSound(animal.sound)
  const name = await randomAnimalName(animal.name)
  return {
    ...animal,
    id: uuidv4(),
    name,
    size,
    weight,
    sound,
  }
}
