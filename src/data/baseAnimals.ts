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

export const STARTING_ANIMALS = [
  {
    id: uuidv4(),
    name: 'Cat',
    sound: 'Meow',
    size: 'Small',
    weight: 'Light',
    canFly: false,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Dog',
    sound: 'Woof',
    size: 'Medium',
    weight: 'Medium',
    canFly: false,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Elephant',
    sound: 'Trumpet',
    size: 'Large',
    weight: 'Heavy',
    canFly: false,
    loudness: 'very loud',
  },
  {
    id: uuidv4(),
    name: 'Bird',
    sound: 'Chirp',
    size: 'Small',
    weight: 'Light',
    canFly: true,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Lion',
    sound: 'Roar',
    size: 'Large',
    weight: 'Heavy',
    canFly: false,
    loudness: 'loud',
  },
  {
    id: uuidv4(),
    name: 'Mouse',
    sound: 'Squeak',
    size: 'Small',
    weight: 'Light',
    canFly: false,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Dolphin',
    sound: 'Click',
    size: 'Medium',
    weight: 'Medium',
    canFly: false,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Eagle',
    sound: 'Screech',
    size: 'Large',
    weight: 'Heavy',
    canFly: true,
    loudness: 'loud',
  },
  {
    id: uuidv4(),
    name: 'Monkey',
    sound: 'Chatter',
    size: 'Medium',
    weight: 'Medium',
    canFly: false,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Owl',
    sound: 'Hoot',
    size: 'Medium',
    weight: 'Light',
    canFly: true,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Snake',
    sound: 'Hiss',
    size: 'Small',
    weight: 'Light',
    canFly: false,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Horse',
    sound: 'Neigh',
    size: 'Large',
    weight: 'Heavy',
    canFly: false,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Penguin',
    sound: 'Squawk',
    size: 'Medium',
    weight: 'Medium',
    canFly: false,
    loudness: 'loud',
  },
  {
    id: uuidv4(),
    name: 'Parrot',
    sound: 'Squawk',
    size: 'Small',
    weight: 'Light',
    canFly: true,
    loudness: 'loud',
  },
  {
    id: uuidv4(),
    name: 'Kangaroo',
    sound: 'Chirp',
    size: 'Medium',
    weight: 'Heavy',
    canFly: false,
    loudness: 'medium',
  },
  {
    id: uuidv4(),
    name: 'Giraffe',
    sound: 'Bleat',
    size: 'Large',
    weight: 'Heavy',
    canFly: false,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Duck',
    sound: 'Quack',
    size: 'Medium',
    weight: 'Medium',
    canFly: true,
    loudness: 'loud',
  },
  {
    id: uuidv4(),
    name: 'Tiger',
    sound: 'Roar',
    size: 'Large',
    weight: 'Heavy',
    canFly: false,
    loudness: 'very loud',
  },
  {
    id: uuidv4(),
    name: 'Rabbit',
    sound: 'Thump',
    size: 'Small',
    weight: 'Light',
    canFly: false,
    loudness: 'quiet',
  },
  {
    id: uuidv4(),
    name: 'Hawk',
    sound: 'Screech',
    size: 'Medium',
    weight: 'Medium',
    canFly: true,
    loudness: 'loud',
  },
] as const satisfies ReadonlyArray<Animal>
