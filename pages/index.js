import { useState, useContext } from 'react'
import { ThemeContextProvider } from '../contexts/theme'
import { ReducerContextProvider } from '../contexts/ReducerContext'
import { BrowserRouter as Router} from 'react-router-dom';
import { fetchData } from '../pages/api/util'

import Layout from '../components/layout.js'
import SelectGroup from '../components/selectgroup.js'

export async function getServerSideProps(context){

  const availableRoutes = await fetchData()

  if(!availableRoutes){
    return {
      notFound: true,
    }
  }

  return  { props: { availableRoutes }, }
}

const heading = <>Metro Transit{' '}<span className="text-blue-600 dark:text-indigo-300">NexTrip</span></>;

export default function NexTrip({ availableRoutes }){
  return (
    <Router>
      <ThemeContextProvider>
        <Layout heading={heading}>
          <ReducerContextProvider>
            <SelectGroup availableRoutes={availableRoutes}/>
          </ReducerContextProvider>
        </Layout>
      </ThemeContextProvider>
    </Router>
  )
}
