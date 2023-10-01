import { useAnimalsStore } from '@/store/animalsStore.ts'
import { DataTable } from '@/components/tables/DataTable.tsx'
import { ANIMAL_COLUMNS } from '@/components/tables/animals/AnimalColumns.tsx'

export const AnimalsTable = () => {
  const animals = useAnimalsStore((state) => state.animals)

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={ANIMAL_COLUMNS} data={animals} />
    </div>
  )
}
