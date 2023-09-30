import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import { AnimalRows } from '@/components/tables/AnimalRows.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'

export const AnimalsTable = () => {
  const animals = useAnimalsStore((state) => state.animals)

  return (
    <Table>
      <TableCaption>Animals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimalRows animals={animals} />
      </TableBody>
    </Table>
  )
}
