import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'

import { useParams } from 'react-router-dom'
import styles from './select.module.css'
//utility to format ids
import capitalize from 'capitalize'

const dev = process.env.NODE_ENV === 'development'

export default function Select({ step, loading, handleChange, dispatch, selectedState, data }){
  const { theme } = useContext(ThemeContext)
  const { routeId, directionId, placeCode } = useParams()

  function handleChange(event, step){
    dispatch({
      type: `${step}Selected`,
      value: event.target.value,
      label: event.target.selectedOptions[0].label,
    })
  }

	return(
      <select className={`${theme === 'light' ? styles.ntSelect : styles.ntSelectDark} appearance-none relative h-16 w-full bg-gray-100 dark:bg-gray-600 border-2 border-gray-200 rounded-md font-bold p-3 mb-5 capitalize transition-opacity ${!selectedState && loading ? 'opacity-0' : 'opacity-100'}`} id={`nt${capitalize(step)}`} name={`nt${capitalize(step)}`} onChange={e => handleChange(e, step)} value={selectedState} aria-invalid="false">
        <option value="" defaultValue disabled>Select {step}</option>
        {data.map( item => {
          if(item.Route){
          	return <option value={item.Route} key={item.Route}>{item.Description}</option>
          }
          if(item.Value){
          	return <option value={item.Value} key={item.Value}>{item.Text}</option>
          }
        })}
      </select>
    )
}