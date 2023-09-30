import './App.css'
import { PageActions } from '@/components/PageActions.tsx'
import { Layout } from '@/components/base/Layout.tsx'
import { Header } from '@/components/base/Header.tsx'
import { AnimalsTable } from '@/components/tables/AnimalsTable.tsx'

function App() {
  return (
    <Layout>
      <Header>Animal Generator</Header>
      <PageActions />
      <AnimalsTable />
    </Layout>
  )
}

export default App
