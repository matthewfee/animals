import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu.tsx'
import { useSound } from '@/hooks/useSound.ts'
import { Animal } from '@/data/baseAnimals.ts'
import { Button } from '@/components/ui/button.tsx'
import { MoreHorizontal } from 'lucide-react'
import {
  ChatBubbleIcon,
  Cross1Icon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons'
import { PRIMARY_BLUE, PRIMARY_GREEN, PRIMARY_RED } from '@/constants/colors.ts'
import { Row } from '@tanstack/react-table'
import { DialogTrigger, Dialog } from '@/components/ui/dialog.tsx'
import { useCallback, useState } from 'react'

import { FlightDialog } from '@/components/dialogs/FlightDialog.tsx'
import { DeleteDialog } from '@/components/dialogs/DeleteDialog.tsx'

export function AnimalActions({ row }: { row: Row<Animal> }) {
  const { makeSound } = useSound()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFlightDialogOpen, setIsFlightDialogOpen] = useState(false)

  const resetUI = useCallback(() => {
    setIsDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setIsFlightDialogOpen(false)
    setIsMenuOpen(false)
  }, [])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        setIsMenuOpen(false)
      }}
    >
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className={'dark'}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className={'flex items-center gap-2'}
            onClick={() => {
              makeSound(row.original)
            }}
          >
            <ChatBubbleIcon color={PRIMARY_BLUE} /> Make Sound
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={'flex gap-2'}
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <DialogTrigger
              className={'flex items-center gap-2'}
              onClick={() => {
                setIsDeleteDialogOpen(true)
                setIsDialogOpen(true)
              }}
            >
              <Cross1Icon color={PRIMARY_RED} />
              Delete
            </DialogTrigger>{' '}
          </DropdownMenuItem>
          {row.original.canFly && (
            <DropdownMenuItem
              className={'flex'}
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <DialogTrigger
                className={'flex items-center gap-2'}
                onClick={() => {
                  setIsFlightDialogOpen(true)
                }}
              >
                <PaperPlaneIcon color={PRIMARY_GREEN} /> Fly away
              </DialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteDialogOpen && <DeleteDialog row={row} resetUI={resetUI} />}
      {isFlightDialogOpen && <FlightDialog row={row} resetUI={resetUI} />}
    </Dialog>
  )
}
