import { Header } from '@/components/base/Header.tsx'
import { PageActions } from '@/components/PageActions.tsx'
import { AnimalsTable } from '@/components/tables/animals/AnimalsTable.tsx'

export const AnimalsScreen = () => {
  return (
    <>
      <Header>Animal Generator</Header>
      <PageActions />
      <AnimalsTable />
    </>
  )
}
