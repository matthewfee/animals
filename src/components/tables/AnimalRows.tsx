import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { Animal } from '@/data/baseAnimals.ts'
import { Button } from '@/components/ui/button.tsx'
import { Cross1Icon, ChatBubbleIcon } from '@radix-ui/react-icons'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { PRIMARY_BLUE, PRIMARY_RED } from '@/constants/colors.ts'
import { useSound } from '@/hooks/useSound.ts'
import { useToast } from '@/components/ui/use-toast.ts'

export const AnimalRows = ({ animals }: { animals: Animal[] }) => {
  const removeAnimal = useAnimalsStore((state) => state.removeAnimal)
  const { toast } = useToast()
  const { makeSound } = useSound()

  const handleAnimalRemove = (animal: Animal) => {
    try {
      removeAnimal(animal.id)
      toast({
        description: `${animal.name} has been removed`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Animal could not be removed',
        variant: 'destructive',
      })
    }
  }

  return animals.map((animal) => (
    <TableRow key={animal.name}>
      <TableCell>{animal.name}</TableCell>
      <TableCell>{animal.size}</TableCell>
      <TableCell>{animal.weight}</TableCell>
      <TableCell className='flex gap-2 text-right'>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            makeSound(animal)
          }}
        >
          <ChatBubbleIcon color={PRIMARY_BLUE} />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <Cross1Icon
            color={PRIMARY_RED}
            onClick={() => {
              handleAnimalRemove(animal)
            }}
          />
        </Button>
      </TableCell>
    </TableRow>
  ))
}
