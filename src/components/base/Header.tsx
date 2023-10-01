import { ReactNode } from 'react'

export const Header = ({ children }: { children: ReactNode }) => {
  return <h1 className={'mb-4 text-2xl'}>{children}</h1>
}
