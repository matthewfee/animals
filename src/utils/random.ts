import { VOWELS } from '@/constants/letters'
import { CONSONANTS } from '@/constants/letters.ts'

export function getRandom<T>(array: T[] | ReadonlyArray<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function getRandomVowel() {
  return getRandom(VOWELS)
}

export function getRandomConsonant() {
  return getRandom(CONSONANTS)
}

export function replaceRandomVowels(name: string) {
  const nameArray = name.split('')
  const newName = nameArray
    .map((letter) => {
      // @ts-ignore
      if (VOWELS.includes(letter)) {
        return getRandomVowel()
      } else {
        return letter
      }
    })
    .join('')
  return newName
}
