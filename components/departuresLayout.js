import { useEffect, useState } from 'react'
import DepartureRow from './departureRow'
export default function DeparturesLayout({children, direction, stopName, loading}){
  return(
    <div id="ntDepartures" className="w-full max-w-600px px-5 md:px-0 pb-10">
      <div className="uppercase text-xl bg-yellow-100 dark:bg-gray-600 p-3 rounded-t-md tracking-wide">
        <sub>{direction}</sub>
        {<h3 className="font-black capitalize">{stopName}</h3>}
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-200 dark:bg-indigo-900 uppercase">
              <th className="w-1/4 py-2">Route</th>
              <th className="w-1/2 py-2">Destination</th>
              <th className="w-1/4 py-2">Departs</th>
            </tr>
          </thead>
            <tbody>
              {children.length > 0 && !loading &&
                children.map(departure =>
                  <DepartureRow departure={departure} key={departure.DepartureTime} />
                )
              }
          </tbody>
        </table>
        {!children.length && !loading &&
          <p className="bg-gray-100 dark:bg-gray-800 rounded-b-lg h-20 flex flex-col justify-center">No departures scheduled.</p>
        }
      </div>
    </div>  
  )
}