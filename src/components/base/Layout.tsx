import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'dark flex h-[110vh] w-full justify-center border-2 bg-background p-4 text-foreground'
      }
    >
      <main
        className={
          'flex w-full max-w-sm flex-col items-center border border-white p-4 md:max-w-md lg:max-w-lg'
        }
      >
        {children}
      </main>
    </div>
  )
}
