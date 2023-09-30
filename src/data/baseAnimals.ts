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

export const SoundLevels = {
  QUIET: 'quiet',
  MEDIUM: 'medium',
  LOUD: 'loud',
  VERY_LOUD: 'very loud',
}

export type SoundLevel = (typeof SoundLevels)[keyof typeof SoundLevels]

// note that this interface is only for the base data, the methods are added when instantiating the class.
export interface Animal {
  id: string
  name: string
  sound: string
  size: AnimalSize
  weight: AnimalWeight
  canFly: boolean
  loudness: SoundLevel
}

export const CAT = {
  id: uuidv4(),
  name: 'Cat',
  sound: 'Meow',
  loudness: SoundLevels.QUIET,
  size: AnimalSizes.SMALL,
  weight: AnimalWeights.LIGHT,
  canFly: false,
}

export const DOG = {
  id: uuidv4(),
  name: 'Dog',
  sound: 'Woof',
  loudness: SoundLevels.MEDIUM,
  size: AnimalSizes.MEDIUM,
  weight: AnimalWeights.MEDIUM,
  canFly: false,
} satisfies Animal

export const ELEPHANT = {
  id: uuidv4(),
  name: 'Elephant',
  sound: 'Trumpet',
  size: AnimalSizes.LARGE,
  loudness: SoundLevels.VERY_LOUD,
  weight: AnimalWeights.HEAVY,
  canFly: false,
} satisfies Animal

export const BIRD = {
  id: uuidv4(),
  name: 'Bird',
  sound: 'Chirp',
  size: AnimalSizes.SMALL,
  loudness: SoundLevels.MEDIUM,
  weight: AnimalWeights.LIGHT,
  canFly: true,
} satisfies Animal

export const STARTING_ANIMALS_LIST = [CAT, DOG, ELEPHANT, BIRD]
