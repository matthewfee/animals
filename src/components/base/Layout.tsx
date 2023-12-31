import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'dark flex min-h-[110vh] w-full justify-center bg-background p-4 text-foreground'
      }
    >
      <main
        className={
          'flex w-full max-w-screen-sm flex-col items-center rounded border border-accent p-4 md:max-w-screen-md lg:max-w-screen-xl'
        }
      >
        {children}
      </main>
    </div>
  )
}
