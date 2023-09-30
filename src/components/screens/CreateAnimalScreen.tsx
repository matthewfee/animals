import { Header } from '@/components/base/Header.tsx'
import { PageActions } from '@/components/PageActions.tsx'
import { CreateAnimalForm } from '@/components/forms/CreateAnimalForm.tsx'

export const CreateAnimalScreen = () => {
  return (
    <>
      <Header>Create Animal</Header>
      <PageActions />
      <CreateAnimalForm />
    </>
  )
}
