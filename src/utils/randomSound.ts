import { CONSONANTS, VOWELS } from '@/constants/letters.ts'
import {
  getRandomConsonant,
  getRandomFromRange,
  getRandomVowel,
} from '@/utils/random.ts'

function getRandomNamePartCounts() {
  const MIN_VOWELS = 1
  const MAX_VOWELS = 5
  const MIN_CONSONANTS = 1
  const MAX_CONSONANTS = 8

  const vowelCount = getRandomFromRange(MIN_VOWELS, MAX_VOWELS)
  const consonantCount = getRandomFromRange(MIN_CONSONANTS, MAX_CONSONANTS)
  return {
    vowelCount,
    consonantCount,
  }
}

function addSpacesToRandomSound(sound: string[]) {
  sound.forEach((_letter, index) => {
    const letterValue = sound[index]
    const nextLetterValue = sound[index + 1]
    const isVowelFollowedByConsonant =
      // @ts-ignore
      VOWELS.includes(letterValue) && CONSONANTS.includes(nextLetterValue)

    if (isVowelFollowedByConsonant) {
      const spaceAfterConsonant = index + 2
      sound.splice(spaceAfterConsonant, 0, ' ')
    }
  })
  return sound
}

function capitalizeFirstLetterOfWords(sound: string[]) {
  return sound.map((letter, index) => {
    const isFirstLetterOfWord = index === 0 || sound[index - 1] === ' '
    if (isFirstLetterOfWord) {
      return letter.toUpperCase()
    } else {
      return letter
    }
  })
}

export function generateRandomSound(): string {
  const { vowelCount, consonantCount } = getRandomNamePartCounts()

  const randomConsonants = Array.from(
    { length: consonantCount },
    getRandomConsonant,
  )
  const randomVowels = Array.from({ length: vowelCount }, getRandomVowel)
  const randomLetters = [...randomConsonants, ...randomVowels]
  const shuffledLetters = randomLetters.sort(() => Math.random() - 0.5)
  const soundWithSpaces = addSpacesToRandomSound(shuffledLetters)
  const capitalizedSound = capitalizeFirstLetterOfWords(soundWithSpaces)
  return capitalizedSound.join('')
}
