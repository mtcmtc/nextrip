import { useState, useEffect, useReducer } from 'react'
import { fetchData } from './api/api'
import Head from 'next/head'

import H1 from '../components/h1.js'
import Select from '../components/select.js'


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
      loading: true,
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
        [action.name] : action.value,
      }
    }
  } else if (action.type === 'directionSelected') {
    return {
      ...state,
      loading: true,
      selectedDirection: action.value,
      selectedStop: '',
      departures: [],
    }
  } else if (action.type === 'stopSelected') {
    return {
      ...state,
      loading: true,
      selectedStop: action.value, 
    }
  }else if (action.type === 'departuresFetched') {
    return {
      ...state,
      loading:false,
      departures: action.value, 
    }
  } else if (action.type === 'loaded'){
    return{
      ...state,
      loading: false,
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
      [action.name]: action.value
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

  useEffect(()=>{
    if(selectedRoute && !fetchedRoutes[selectedRoute]){
      try{
        fetchData(selectedRoute)
        .then( directions => {
          dispatch({ 
            type : 'directionsFetched',
            name : selectedRoute,
            value : directions,
          })
        })
      } catch(e){
        console.warn('Error fetching directions for specified route: ', error)
        dispatch({ type : 'error' })
      }
    }
  },[selectedRoute])

  useEffect(()=>{
    if(selectedDirection && !fetchedRoutes[selectedRoute][selectedDirection].stops){
      fetchData(selectedRoute, selectedDirection)
      .then( stops => {
        fetchedRoutes[selectedRoute][selectedDirection].stops = stops
        dispatch({ type : 'loaded' })
      })
    }
  },[selectedDirection])

  useEffect(()=>{
    if(selectedStop){
      fetchData(selectedRoute, selectedDirection, selectedStop)
      .then( departures => {
        dispatch({ 
          type : 'departuresFetched',
          value : departures,
        })
      })
    }
  },[selectedStop])

  function handleRoute(event){
    dispatch({
      type: 'routeSelected',
      value: event.target.value,
    })
  }

  function handleDirection(event){
    dispatch({
      type: 'directionSelected',
      value: event.target.value,
    })
  }

  function handleStop(event){
    dispatch({
      type: 'stopSelected',
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
            <Select step={'Route'} changeHandler={handleRoute} selectedState={selectedRoute} data={availableRoutes}/>
            
            {fetchedRoutes[selectedRoute] &&
              <Select step={'Direction'} changeHandler={handleDirection} selectedState={selectedDirection} data={fetchedRoutes[selectedRoute]}/>
            }
            
            {selectedDirection && fetchedRoutes[selectedRoute][selectedDirection].stops &&
              <Select step={'Stop'} changeHandler={handleStop} selectedState={selectedStop} data={fetchedRoutes[selectedRoute][selectedDirection].stops}/>
            }
          </div>
          {selectedStop &&
            <div id="ntDepartures" className="w-full">
              <div className="uppercase text-xl bg-yellow-100 p-3 rounded-md tracking-wide">
                <sub>{fetchedRoutes[selectedRoute][selectedDirection].Text}</sub>
                <h3 className="font-black capitalize">{ntStop.selectedOptions[0].label}</h3>
              </div>
              <div>
                {!departures.length && !loading ?
                  <p>No departures scheduled.</p>
                  :
                  <table className="w-full">
                    <thead>
                      <tr className="bg-yellow-200 uppercase">
                        <th className="w-1/4 py-2">Route</th>
                        <th className="w-1/2 py-2">Destination</th>
                        <th className="w-1/4 py-2">Departs</th>
                      </tr>
                    </thead>
                      <tbody>
                      {departures.map(departure => 
                      <tr className="bg-gray-100 border-b border-gray-300 rounded-lg" key={departure.DepartureTime}>
                        <td className="py-5 font-bold">{departure.Route}</td>
                        <td className="py-5">{departure.Description}</td>
                        <td className="py-5 font-bold">{departure.DepartureText}</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                }
              </div>
            </div>
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
