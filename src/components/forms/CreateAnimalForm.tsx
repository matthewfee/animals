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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { randomAnimal, randomAnimalName } from '@/utils/randomAnimal.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { useAnimalsStore } from '@/store/animalsStore.ts'
import { v4 as uuidv4 } from 'uuid'
import { MouseEvent } from 'react'
import { generateRandomSound } from '@/utils/randomSound.ts'
import { getRandom } from '@/utils/random.ts'
import { Screens } from '@/store/screenStore.ts'
import { useScreenStore } from '@/store/screenStore.ts'

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
    console.log(data)
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
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='name'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormDescription>This is your new animals' name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='size'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select your animal's size`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AnimalSizes).map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>This is your new animals' size.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='sound'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sound</FormLabel>
              <FormControl>
                <Input placeholder='sound' {...field} />
              </FormControl>
              <FormDescription>
                The type of sound your animal makes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='loudness'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loudness</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select your animal's loudness`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(SoundLevels).map((loudness) => (
                    <SelectItem key={loudness} value={loudness}>
                      {loudness}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is your new animals' loudness.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select your animal's weight`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AnimalWeights).map((weight) => (
                    <SelectItem key={weight} value={weight}>
                      {weight}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is your new animals' weight.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
