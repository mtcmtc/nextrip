import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { fetchData } from '../pages/api/util'

import DeparturesLayout from './departuresLayout'

const dev = process.env.NODE_ENV === 'development'

export default function Departures({fetchedRoutes, loading}){
  const { routeId, directionId, placeCode } = useParams()
  const [departures, setDepartures] = useState([])
  const [stopName, setStopName] = useState('')
  const history = useHistory()

  useEffect(()=>{
    //handle stopName
    setStopName(history.location.state.selectedStopName)

    //handle departures
    let id = null;
    fetchData(routeId, directionId, placeCode)
    .then( data => {
      // console.log('starting interval')
      setDepartures(data)
      id = setInterval(()=>{
        // console.log('10 seconds passed')
        fetchData(routeId, directionId, placeCode)
        .then( data => setDepartures(data))
      },10000)
    })

    return () => clearInterval(id)
  },[placeCode])

  return(
    <>
    {dev && 
      <div><span>route id: {routeId}</span>...
      <span>direction id: {directionId}</span>...
      <span>place code: {placeCode}</span></div>
    }
    <DeparturesLayout direction={fetchedRoutes[routeId][directionId].Text} stopName={stopName} loading={loading}>
      {departures}
    </DeparturesLayout>
    </>
  )
}