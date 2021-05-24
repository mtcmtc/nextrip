import { useParams } from 'react-router-dom'

const dev = process.env.NODE_ENV === 'development'

export default function Departures({stopName, direction, departures, loading}){
  const { routeId, directionId, placeCode } = useParams()
  return(
    <>
    {dev && 
      <div><span>route id: {routeId}</span>...
      <span>direction id:{directionId}</span>...
      <span>place code: {placeCode}</span></div>
    }
    <div id="ntDepartures" className="w-full max-w-600px px-5 md:px-0 pb-10">
      <div className="uppercase text-xl bg-yellow-100 dark:bg-gray-600 p-3 rounded-t-md tracking-wide">
        <sub>{direction.Text}</sub>
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
              {departures.length > 0 && !loading &&
                departures.map(departure => 
                <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 rounded-lg" key={departure.DepartureTime}>
                  <td className="py-5 font-bold">{departure.Route}</td>
                  <td className="py-5">{departure.Description}</td>
                  <td className="py-5 font-bold">{departure.DepartureText}</td>
                </tr>
                )
              }
          </tbody>
        </table>
        {!departures.length && !loading &&
          <p className="bg-gray-100 dark:bg-gray-800 rounded-b-lg h-20 flex flex-col justify-center">No departures scheduled.</p>
        }
      </div>
    </div>  
    </>
  )
}