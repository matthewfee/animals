import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Control, FieldValues, Path } from 'react-hook-form'

export function FormFieldInput<T extends FieldValues>({
  control,
  name,
  description,
  placeholder,
  label,
}: {
  control: Control<T>
  name: Path<T>
  description?: string
  placeholder: string
  label: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => {
                field.onChange(e)
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
