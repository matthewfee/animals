import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { useToast } from '@/components/ui/use-toast.ts'
import { useSound } from '@/hooks/useSound.ts'
import { Animal } from '@/data/baseAnimals.ts'
import { AnimalClass } from '@/classes/animal.tsx'
import { Button } from '@/components/ui/button.tsx'
import { MoreHorizontal } from 'lucide-react'
import { ChatBubbleIcon, Cross1Icon } from '@radix-ui/react-icons'
import { PRIMARY_BLUE, PRIMARY_RED } from '@/constants/colors.ts'
import { Row } from '@tanstack/react-table'
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog.tsx'
import { useState } from 'react'

export function AnimalActions({ row }: { row: Row<Animal> }) {
  const removeAnimal = useAnimalsStore((state) => state.removeAnimal)
  const { toast } = useToast()
  const { makeSound } = useSound()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  function handleAnimalRemove(animal: Animal) {
    try {
      removeAnimal(animal.id)
      const sound = new AnimalClass(animal).makeSound()
      toast({
        title: `Death of ${animal.name}`,
        description: `${animal.name} has perished. Their sound was "${sound}." It will never be heard again.
            `,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: `Animal could not be removed. ${animal.name} is immortal.`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={(open) => {
        setIsDeleteDialogOpen(open)
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
            <DialogTrigger className={'flex items-center gap-2'}>
              <Cross1Icon color={PRIMARY_RED} />
              Delete
            </DialogTrigger>{' '}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className={'dark'}>
        <DialogHeader>
          <DialogTitle>
            Are you sure you would like to delete {row.original.name}?
          </DialogTitle>
          <DialogDescription className={'p-4'}>
            Once deleted, {row.original.name} will be gone forever.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type={'submit'}
            variant={'destructive'}
            onClick={() => {
              handleAnimalRemove(row.original)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
