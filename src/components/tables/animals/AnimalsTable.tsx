import { useAnimalsStore } from '@/store/animalsStore.ts'
import { DataTable } from '@/components/tables/DataTable.tsx'
import { ANIMAL_COLUMNS } from '@/components/tables/animals/AnimalColumns.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useCallback, useEffect } from 'react'
import { getRandom } from '@/utils/random.ts'
import { useSound } from '@/hooks/useSound.ts'

export const AnimalsTable = () => {
  const animals = useAnimalsStore((state) => state.animals)
  const { makeSound } = useSound()
  const makeRandomSound = useCallback(() => {
    const randomAnimal = getRandom(animals)
    makeSound(randomAnimal)
  }, [animals, makeSound])

  useEffect(() => {
    const interval = setInterval(() => {
      makeRandomSound()
    }, 10000)
    return () => clearInterval(interval)
  }, [makeRandomSound])

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={ANIMAL_COLUMNS} data={animals} />
    </div>
  )
}
