import Head from 'next/head'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import Toggle from '../components/toggle'

export default function Layout({heading, children}){
  const { theme, toggleTheme } = useContext(ThemeContext)
  return(
    <div className={`${theme} flex flex-col items-center justify-center min-h-screen`}>
      <Head>
        <title>Metro Transit SelectGroup Case Study</title>
        <link rel="icon" href="/favicon32x32.png" />
      </Head>

      <nav className="dark:bg-gray-900 w-full">
        <div className="container py-2 mr-5 flex justify-end">
          <Toggle theme={theme} toggleTheme={toggleTheme}/>
        </div>
      </nav>
      <main className="flex flex-col items-center justify-start w-full flex-1 text-center dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-6xl font-bold mb-5 px-5 pt-10 pb-5">
            {heading}
        </h1>
        {children}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t dark:bg-gray-900 dark:text-gray-100">
        <a
          className="flex items-center justify-center"
          href="https://github.com/mtcmtc/SelectGroup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' '}Michael Chen
        </a>
      </footer>
    </div>
  )
}