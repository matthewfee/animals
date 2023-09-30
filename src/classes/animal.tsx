import {
  Animal,
  AnimalSize,
  AnimalWeight,
  SoundLevel,
  SoundLevels,
} from '@/data/baseAnimals.ts'

// determines the sound level of an animal based on its size and weight
export class AnimalClass {
  id: string
  name: string
  sound: string
  size: AnimalSize
  weight: AnimalWeight
  canFly: boolean
  loudness: SoundLevel
  constructor(animal: Animal) {
    this.id = animal.id
    this.name = animal.name
    this.sound = animal.sound
    this.size = animal.size
    this.weight = animal.weight
    this.canFly = animal.canFly
    this.loudness = animal.loudness
  }

  makeSound(): string {
    let sound = this.sound

    if (this.loudness === SoundLevels.QUIET) {
      sound = sound.toLowerCase() + '...'
    }
    if (this.loudness === SoundLevels.LOUD) {
      sound = sound.toUpperCase()
    }
    if (this.loudness === SoundLevels.VERY_LOUD) {
      sound = sound.toUpperCase() + '!!!!!'
    }

    return sound
  }
}
