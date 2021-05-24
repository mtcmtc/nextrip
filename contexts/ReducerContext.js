import { useReducer, useRef, createContext } from 'react'

function routeReducer(state, action) {
  if (action.type === 'routeSelected') {
    return {
      ...state,
      selectedRouteId: action.value,
      selectedDirectionId: '',
      selectedStopId: '',
    }
  } else if (action.type === 'success') {
    return {
      ...state,
      loading: false,
    }
  } else if (action.type === 'directionSelected') {
    return {
      ...state,
      selectedDirectionId: action.value,
      selectedStopId: '',
    }
  } else if (action.type === 'stopSelected') {
    return {
      ...state,
      selectedStopId: action.value,
      selectedStopName: action.label
    }
  } else if (action.type === 'loading'){
    return{
      ...state,
      loading: true,
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if (action.type === 'reset') {
    return {
      selectedRouteId: '',
      selectedDirectionId: '',
      selectedStopId: '',
      loading: false,
      error: false
    }
  } else {
    throw new Error(`That action doesn't exist`)
  }
}

export const ReducerContext = createContext(null);

export function ReducerContextProvider({ children }){
	const [state, dispatch] = useReducer(
	routeReducer,
		{ 
		  selectedRouteId: '',
		  selectedDirectionId: '',
		  selectedStopId: '',
		  selectedStopName: '',
		  loading: false,
		  error: false 
		}
	)
	const fetchedRoutes = useRef({});
	return (
		<ReducerContext.Provider value={{ state, dispatch, fetchedRoutes }}>
		  {children}
		</ReducerContext.Provider>
	);
};

