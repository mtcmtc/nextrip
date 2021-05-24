import Head from 'next/head'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import { ReducerContext } from '../contexts/ReducerContext'
import Toggle from '../components/toggle'

export default function Layout({heading, children}){
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { state, dispatch } = useContext(ReducerContext);
  return(
    <div className={`${theme}`}>
      <Head>
        <title>Metro Transit SelectGroup Case Study</title>
        <link rel="icon" href="/favicon32x32.png" />
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900'>
        <nav className="bg-opacity-80 dark:bg-opacity-80 bg-white border-b-2 dark:bg-gray-900 sticky top-0 w-full z-10">
          <div className="container flex items-center justify-between justify-end mx-auto py-2">
            <Toggle theme={theme} toggleTheme={toggleTheme}/>
            <div className="mr-5"><button 
              onClick={() =>{ dispatch({ type: 'reset' }) }}
              className={`opacity-50 transition-opacity ${state.selectedRouteId ? 'opacity-100': 'pointer-events-none'} bg-white border-2 border-gray-300 dark:bg-gray-600 dark:border-white dark:text-white font-bold p-3 rounded-lg uppercase`}
              >Reset</button></div>
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
    </div>
  )
}