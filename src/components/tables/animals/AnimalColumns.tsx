import { Animal } from '@/data/baseAnimals.ts'
import { ColumnDef } from '@tanstack/react-table'
import { AnimalActions } from '@/components/tables/animals/AnimalActions.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ArrowUpDown, Check } from 'lucide-react'
import {
  sortAnimalLoudness,
  sortAnimalSize,
  sortAnimalWeight,
} from '@/utils/sorting.ts'
import { PRIMARY_BLUE } from '@/constants/colors.ts'
export const ANIMAL_COLUMNS: ColumnDef<Animal>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span className='font-bold capitalize'>{row.original.name}</span>
    },
  },
  {
    accessorKey: 'sound',
    header: 'Sound',
  },
  {
    accessorKey: 'size',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    sortingFn: (rowA, rowB) => {
      return sortAnimalSize(rowA.original, rowB.original)
    },
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Weight
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    sortingFn: (rowA, rowB) => {
      return sortAnimalWeight(rowA.original, rowB.original)
    },
  },
  {
    accessorKey: 'loudness',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Loudness
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    sortingFn: (rowA, rowB) => {
      return sortAnimalLoudness(rowA.original, rowB.original)
    },
  },
  {
    accessorKey: 'canFly',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Flight
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.canFly && <Check color={PRIMARY_BLUE} />
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <AnimalActions row={row} />
    },
  },
]
