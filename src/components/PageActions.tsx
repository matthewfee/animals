import { Button } from '@/components/ui/button.tsx'
import { Screens, useScreenStore } from '@/store/screenStore.ts'

export const PageActions = () => {
  const setScreen = useScreenStore((state) => state.setScreen)
  const screen = useScreenStore((state) => state.screen)
  return (
    <div className={'mb-4 mb-4 flex w-full justify-end'}>
      {screen === Screens.ANIMALS && (
        <Button
          onClick={() => {
            setScreen(Screens.CREATE_ANIMAL)
          }}
        >
          Create New Animal
        </Button>
      )}
      {screen === Screens.CREATE_ANIMAL && (
        <Button
          onClick={() => {
            setScreen(Screens.ANIMALS)
          }}
        >
          Back to Animals
        </Button>
      )}
    </div>
  )
}
