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

export default function NexTrip({ availableRoutes }){
  return (
    <Router>
      <ThemeContextProvider>
        <ReducerContextProvider>
          <Layout>
            <SelectGroup availableRoutes={availableRoutes}/>
          </Layout>
        </ReducerContextProvider>
      </ThemeContextProvider>
    </Router>
  )
}
