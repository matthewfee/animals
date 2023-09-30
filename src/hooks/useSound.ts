import { AnimalClass } from '@/classes/animal'
import { useToast } from '@/components/ui/use-toast.ts'
import { Animal } from '@/data/baseAnimals.ts'
export const useSound = () => {
  const { toast } = useToast()

  const makeSound = (animal: Animal) => {
    const animalInstance = new AnimalClass(animal)
    const sound = animalInstance.makeSound()
    toast({
      title: animalInstance.name,
      description: `♫ ${sound} ♫`,
    })
  }

  return {
    makeSound,
  }
}
