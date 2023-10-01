import './App.css'
import { Layout } from '@/components/base/Layout.tsx'
import { Screens, useScreenStore } from '@/store/screenStore.ts'
import { CreateAnimalScreen } from '@/components/screens/CreateAnimalScreen.tsx'
import { AnimalsScreen } from '@/components/screens/AnimalsScreen.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'

function App() {
  const screen = useScreenStore((state) => state.screen)
  return (
    <>
      <Layout>
        {screen === Screens.ANIMALS && <AnimalsScreen />}
        {screen === Screens.CREATE_ANIMAL && <CreateAnimalScreen />}
      </Layout>
      <Toaster />
    </>
  )
}

export default App
