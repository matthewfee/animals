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
import { randomAnimal, randomAnimalName } from '@/utils/randomAnimal.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { v4 as uuidv4 } from 'uuid'
import { MouseEvent } from 'react'
import { generateRandomSound } from '@/utils/randomSound.ts'
import { getRandom } from '@/utils/random.ts'
import { Screens } from '@/store/screenStore.ts'
import { useScreenStore } from '@/store/screenStore.ts'
import { FormFieldSelect } from '@/components/forms/FormFieldSelect.tsx'
import { FormFieldInput } from '@/components/forms/FormFieldInput.tsx'

const animalCreateFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(40, 'Name must be less than 40 characters'),
  size: z.nativeEnum(AnimalSizes),
  sound: z
    .string()
    .min(1, 'Sound is required')
    .max(40, 'Sound must be less than 40 characters'),
  loudness: z.nativeEnum(SoundLevels),
  weight: z.nativeEnum(AnimalWeights),
  canFly: z.boolean(),
})
export const CreateAnimalForm = () => {
  const addAnimal = useAnimalsStore((state) => state.addAnimal)
  const form = useForm<z.infer<typeof animalCreateFormSchema>>({
    resolver: zodResolver(animalCreateFormSchema),
    defaultValues: {
      name: randomAnimalName(),
      size: getRandom(Object.values(AnimalSizes)),
      sound: generateRandomSound(),
      loudness: getRandom(Object.values(SoundLevels)),
      weight: getRandom(Object.values(AnimalWeights)),
      canFly: Math.random() > 0.5,
    },
  })
  const setScreen = useScreenStore((state) => state.setScreen)
  function onSubmit(data: z.infer<typeof animalCreateFormSchema>) {
    if (!form.formState.isValid) {
      form.trigger()
      return
    }

    const id = uuidv4()
    addAnimal({
      ...data,
      id,
    })
    form.reset()
    setScreen(Screens.ANIMALS)
  }

  function generateRandomAnimal(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const newAnimal = randomAnimal()
    form.reset(newAnimal)
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
            'This is your new animals size.Small animals will repeat their sounds more often.'
          }
          label={'Size'}
        />

        <FormFieldSelect
          control={form.control}
          options={Object.values(SoundLevels)}
          name={'loudness'}
          description={'This is your new animals loudness.'}
          label={'Loudness'}
        />

        <FormFieldSelect
          control={form.control}
          options={Object.values(AnimalWeights)}
          name={'weight'}
          description={'This is your new animals weight.'}
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
          <Button onClick={generateRandomAnimal}>Random Animal</Button>
          <Button type='submit' disabled={!form.formState.isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
