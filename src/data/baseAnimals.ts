import { v4 as uuidv4 } from 'uuid'

export const AnimalSizes = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
} as const

export type AnimalSize = (typeof AnimalSizes)[keyof typeof AnimalSizes]
export const AnimalWeights = {
  LIGHT: 'Light',
  MEDIUM: 'Medium',
  HEAVY: 'Heavy',
} as const

export type AnimalWeight = (typeof AnimalWeights)[keyof typeof AnimalWeights]

// note that this interface is only for the base data, the methods are added when instantiating the class.
export interface Animal {
  id: string
  name: string
  sound: string
  size: AnimalSize
  weight: AnimalWeight
  canFly: boolean
}

export const CAT = {
  id: uuidv4(),
  name: 'Cat',
  sound: 'Meow',
  size: AnimalSizes.SMALL,
  weight: AnimalWeights.LIGHT,
  canFly: false,
} satisfies Animal

export const DOG = {
  id: uuidv4(),
  name: 'Dog',
  sound: 'Woof',
  size: AnimalSizes.MEDIUM,
  weight: AnimalWeights.MEDIUM,
  canFly: false,
} satisfies Animal

export const ELEPHANT = {
  id: uuidv4(),
  name: 'Elephant',
  sound: 'Trumpet',
  size: AnimalSizes.LARGE,
  weight: AnimalWeights.HEAVY,
  canFly: false,
} satisfies Animal

export const BIRD = {
  id: uuidv4(),
  name: 'Bird',
  sound: 'Chirp',
  size: AnimalSizes.SMALL,
  weight: AnimalWeights.LIGHT,
  canFly: true,
} satisfies Animal

export const STARTING_ANIMALS_LIST = [CAT, DOG, ELEPHANT, BIRD]
