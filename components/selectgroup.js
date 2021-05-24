import { useState, useEffect, useContext } from 'react'
import { ReducerContext } from '../contexts/ReducerContext'
import { Route, useHistory } from 'react-router-dom';
import { fetchData } from '../pages/api/util'

import Select from '../components/select.js'
import Loading from '../components/loading.js'
import Departures from '../components/departures.js'

const dev = process.env.NODE_ENV === 'development'

export default function SelectGroup({ availableRoutes }) {
  const { state, dispatch, fetchedRoutes } = useContext(ReducerContext);
  const {selectedRouteId, selectedDirectionId, selectedStopId, selectedStopName, departures, loading, error} = state
  const history = useHistory();

  const [ locationKeys, setLocationKeys ] = useState([])

  useEffect(() => {
    return history.listen(location => {

      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])
          if(!location.state.selectedRouteId){ ntRoute.selectedIndex = 0}
          else if(!location.state.selectedDirectionId){ ntDirection.selectedIndex = 0}
          else if(!location.state.selectedStopId){ ntStop.selectedIndex = 0}
        }
      }
    })
  }, [ locationKeys, ])

  useEffect(()=>{
    let fetchStep
    if(selectedRouteId && !fetchedRoutes.current[selectedRouteId]) fetchStep = 'direction'
    if(selectedDirectionId && !fetchedRoutes.current[selectedRouteId][selectedDirectionId].stops) fetchStep = 'stop'

    let path = `/${selectedRouteId}`
    if(selectedDirectionId){
      path += `/${selectedDirectionId}`
    }
    if(selectedStopId){
      path += `/${selectedStopId}`
    }

    history.push(path, state)

    if(fetchStep){
      try{
        dispatch({ type : 'loading'})
        fetchData(selectedRouteId, selectedDirectionId)
        .then( data => { 
          if(fetchStep === 'direction') { 
            fetchedRoutes.current[selectedRouteId] = data
          }
          if(fetchStep === 'stop') {
            fetchedRoutes.current[selectedRouteId][selectedDirectionId].stops = data
          }
          dispatch({ type : 'success' })
        })
      } catch(e){
        console.warn('Error fetching departures for specified stop: ', error)
        dispatch({ type : 'error', error : e })
      }
    }
  },[selectedRouteId, selectedDirectionId, selectedStopId])

  return (
    <>
    <div className="container max-w-500px px-5">
      {dev &&
        <div><p>current route id: {selectedRouteId}</p>
        <p>direction id: {selectedDirectionId}</p>
        <p>stop id: {selectedStopId}</p>
        </div>
      }
      <Route path="/">
        <Select 
          step={'route'}
          loading={loading}
          dispatch={dispatch}
          selectedState={selectedRouteId}
          data={availableRoutes}
        />
      </Route>

      <Route path="/:routeId">
        {fetchedRoutes.current[selectedRouteId] &&
          <Select 
            step={'direction'}
            loading={loading}
            dispatch={dispatch}
            selectedState={selectedDirectionId}
            data={fetchedRoutes.current[selectedRouteId]}
          />
        }
      </Route>
      
      <Route path="/:routeId/:directionId">
        {selectedDirectionId && fetchedRoutes.current[selectedRouteId][selectedDirectionId].stops &&
          <Select
            step={'stop'}
            loading={loading}
            dispatch={dispatch}
            selectedState={selectedStopId}
            data={fetchedRoutes.current[selectedRouteId][selectedDirectionId].stops}
          />
        }
      </Route>
    </div>
    <Route path="/:routeId/:directionId/:placeCode">
    {selectedStopId &&
      <Departures 
        fetchedRoutes={fetchedRoutes.current}
        loading={loading}
      />
    }
    </Route>
    {loading && <Loading loading={loading} />}
    {error && <p className='center-text error'>{error}</p>}
    </>
  )
}