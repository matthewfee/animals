import * as z from 'zod'
import { AnimalSizes, AnimalWeights, SoundLevels } from '@/data/baseAnimals.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button.tsx'
import { randomAnimal } from '@/utils/randomAnimal.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { v4 as uuidv4 } from 'uuid'
import { useState, MouseEvent } from 'react'
import { Screens } from '@/store/screenStore.ts'
import { useScreenStore } from '@/store/screenStore.ts'
import { FormFieldSelect } from '@/components/forms/FormFieldSelect.tsx'
import { FormFieldInput } from '@/components/forms/FormFieldInput.tsx'
import { AnimalClass } from '@/classes/animal.tsx'
import { useToast } from '@/components/ui/use-toast.ts'
import { Loader2 } from 'lucide-react'

const animalCreateFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Every animal must have a name!')
    .max(
      40,
      'That name is too long for an animal. The other animals will laugh at it.',
    )
    .regex(/^\D*$/, 'Numbers are not names! Animals are not robots!'),
  size: z.nativeEnum(AnimalSizes),
  sound: z
    .string()
    .min(1, 'Your animal needs a sound!')
    .max(40, 'Sound must be less than 40 characters')
    .regex(/^\D*$/, 'Numbers are not sounds! Animals are not robots!'),
  loudness: z.nativeEnum(SoundLevels),
  weight: z.nativeEnum(AnimalWeights),
  canFly: z.boolean(),
})
export const CreateAnimalForm = () => {
  const addAnimal = useAnimalsStore((state) => state.addAnimal)
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof animalCreateFormSchema>>({
    resolver: zodResolver(animalCreateFormSchema),
    defaultValues: {
      name: undefined,
      size: undefined,
      sound: undefined,
      loudness: undefined,
      weight: undefined,
      canFly: false,
    },
    mode: 'onBlur',
  })
  const setScreen = useScreenStore((state) => state.setScreen)
  function onSubmit(data: z.infer<typeof animalCreateFormSchema>) {
    if (!form.formState.isValid) {
      form.trigger()
      return
    }
    const id = uuidv4()
    const newAnimal = {
      ...data,
      id,
    }

    addAnimal(newAnimal)
    form.reset()
    const sound = new AnimalClass(newAnimal).makeSound()

    toast({
      title: 'Animal Created',
      description: `${data.name} has been created. Their sound is "${sound}."`,
    })

    setScreen(Screens.ANIMALS)
  }

  async function generateRandomAnimal(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    setLoading(true)
    const newAnimal = await randomAnimal()
    form.reset(newAnimal)
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='dark space-y-8'>
        <FormFieldInput
          control={form.control}
          name={'name'}
          placeholder={'Name'}
          label={'Name'}
          description={'This is your new animals name.'}
        />

        <FormFieldInput
          control={form.control}
          name={'sound'}
          placeholder={'Sound'}
          label={'Sound'}
          description={'This is your new animals sound.'}
        />

        <FormFieldSelect
          control={form.control}
          options={Object.values(AnimalSizes)}
          name={'size'}
          description={
            'This is your new animals size. Small animals will repeat their sounds more often.'
          }
          label={'Size'}
          placeholder={`Select a size`}
        />

        <FormFieldSelect
          control={form.control}
          options={Object.values(SoundLevels)}
          name={'loudness'}
          description={'This is your new animals loudness.'}
          label={'Loudness'}
          placeholder={`Select loudness`}
        />

        <FormFieldSelect
          control={form.control}
          options={Object.values(AnimalWeights)}
          name={'weight'}
          description={'This is your new animals weight.'}
          placeholder={`Select weight`}
          label={'Weight'}
        />

        <FormField
          control={form.control}
          name='canFly'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormLabel>Can Fly</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is your new animals' ability to fly.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={'flex justify-end gap-2'}>
          <Button
            className={'flex w-[140px] justify-center'}
            variant={'secondary'}
            onClick={generateRandomAnimal}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>
            ) : (
              `Random Animal`
            )}
          </Button>
          <Button type='submit' disabled={!form.formState.isValid || loading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
