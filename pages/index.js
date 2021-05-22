import { useEffect, useReducer, useRef } from 'react'
import { fetchData } from './api/api'

import Head from 'next/head'

import H1 from '../components/h1.js'
import Select from '../components/select.js'
import Departures from '../components/departures.js'

export async function getServerSideProps(context){

  const availableRoutes = await fetchData()

  if(!availableRoutes){
    return {
      notFound: true,
    }
  }

  return  { props: { availableRoutes }, }
}

function Loading () {
  return <p>Loading...</p>
}

function routeReducer(state, action) {
  if (action.type === 'routeSelected') {
    return {
      ...state,
      selectedRoute: action.value,
      selectedDirection: '',
      selectedStop: '',
      departures: [],
    }
  } else if (action.type === 'directionsFetched') {
    return {
      ...state,
      loading: false,
      fetchedRoutes: {
        ...state.fetchedRoutes,
        [action.selectedRoute] : action.directions,
      },
    }
  } else if (action.type === 'directionSelected') {
    return {
      ...state,
      selectedDirection: action.value,
      selectedStop: '',
      departures: [],
    }
  } else if (action.type === 'stopsFetched'){
    return{
      ...state,
      loading: false,
    }
  } else if (action.type === 'stopSelected') {
    return {
      ...state,
      selectedStop: action.value, 
    }
  }else if (action.type === 'departuresFetched') {
    return {
      ...state,
      loading: false,
      departures: action.departures,
    }
  } else if (action.type === 'loading'){
    return{
      ...state,
      loading: true,
    }
  }else if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if (action.type === 'reset') {
    return {
      ...state,
      selectedRoute: '',
      selectedDirection: '',
      selectedStop: '',
      departures: [],
      loading: false,
      error: false
    }
  } else {
    throw new Error(`That action doesn't exist`)
  }
}

export default function Home({ availableRoutes }) {
  const [state, dispatch] = useReducer(
    routeReducer,
    { 
      selectedRoute: '',
      selectedDirection: '',
      selectedStop: '',
      fetchedRoutes: {},
      departures: [],
      loading: false,
      error: false 
    }
  )
  const {selectedRoute, selectedDirection, selectedStop, fetchedRoutes, departures, loading, error} = state
  const selectHistory = useRef([]);

  useEffect(()=>{
    if(selectedRoute && !fetchedRoutes[selectedRoute]){
      try{
        dispatch({ type : 'loading'})
        fetchData(selectedRoute)
        .then( directions => {
          dispatch({ 
            type : 'directionsFetched',
            selectedRoute,
            directions,
          })
        })
      } catch(e){
        console.warn('Error fetching directions for specified route: ', error)
        dispatch({ type : 'error', error : e })
      }
    }
  },[selectedRoute])

  useEffect(()=>{
    if(selectedDirection && !fetchedRoutes[selectedRoute][selectedDirection].stops){
      try{
        dispatch({ type : 'loading'})
        fetchData(selectedRoute, selectedDirection)
        .then( stops => {
          fetchedRoutes[selectedRoute][selectedDirection].stops = stops
          dispatch({ 
            type : 'stopsFetched'})
        })
      } catch(e){
        console.warn('Error fetching stops for specified route: ', error)
        dispatch({ type : 'error', error : e })
      }
    }
  },[selectedDirection])

  useEffect(()=>{
    if(selectedStop){
      try{
        dispatch({ type : 'loading'})
        fetchData(selectedRoute, selectedDirection, selectedStop)
        .then( departures => {
          dispatch({ 
            type : 'departuresFetched',
            departures
          })
        })
      } catch(e){
        console.warn('Error fetching departures for specified stop: ', error)
        dispatch({ type : 'error', error : e })
      }
    }
  },[selectedStop])

  function handleChange(event, step){
    let format = step.toLowerCase();
    selectHistory.current.push({ [format] : event.target.value})
    dispatch({
      type: `${format}Selected`,
      value: event.target.value,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Metro Transit NexTrip Case Study</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start w-full flex-1 text-center">
        <H1>
          Metro Transit{' '}
          <span className="text-blue-600">
            NexTrip
          </span>
        </H1>
        <div className="container max-w-500px px-5">
          <p>current route id: {selectedRoute}</p>
          <p>direction id: {selectedDirection}</p>
          <p>stop id: {selectedStop}</p>
          <br/>

          <Select 
            step={'Route'}
            handleChange={ e => handleChange(e, 'Route')}
            selectedState={selectedRoute}
            data={availableRoutes}
          />
          
          {fetchedRoutes[selectedRoute] &&
            <Select 
              step={'Direction'}
              handleChange={ e => handleChange(e, 'Direction')}
              selectedState={selectedDirection}
              data={fetchedRoutes[selectedRoute]}
            />
          }
          
          {selectedDirection && fetchedRoutes[selectedRoute][selectedDirection].stops &&
            <Select
              step={'Stop'}
              handleChange={ e => handleChange(e, 'Stop')}
              selectedState={selectedStop}
              data={fetchedRoutes[selectedRoute][selectedDirection].stops}
            />
          }
        </div>
        {selectedStop &&
          <Departures 
            stop={ntStop.selectedOptions[0]}
            direction={fetchedRoutes[selectedRoute][selectedDirection]}
            departures={departures}
            loading={loading}
          />
        }

        {loading && <Loading />}
        {error && <p className='center-text error'>{error}</p>}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/mtcmtc/nextrip"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' '}Michael Chen
        </a>
      </footer>
    </div>
  )
}
