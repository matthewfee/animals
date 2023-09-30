import { create } from 'zustand'

export const Screens = {
  ANIMALS: 'Animals',
  CREATE_ANIMAL: 'CreateAnimal',
}

export type Screen = (typeof Screens)[keyof typeof Screens]

interface ScreenStore {
  screen: Screen
  setScreen: (screen: Screen) => void
}

export const useScreenStore = create<ScreenStore>((set) => ({
  screen: Screens.ANIMALS,
  setScreen: (screen: Screen) => {
    set({ screen })
  },
}))
