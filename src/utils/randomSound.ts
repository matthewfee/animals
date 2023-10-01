import {
  flipCoin,
  replaceRandomConsonants,
  replaceRandomVowels,
} from '@/utils/random.ts'

export function generateRandomSound(baseSound: string): string {
  const coinFlip = flipCoin()
  return coinFlip
    ? replaceRandomVowels(baseSound)
    : replaceRandomConsonants(baseSound)
}
