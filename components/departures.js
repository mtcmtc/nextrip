
export default function Departures({stop, direction, departures, loading}){
  return(
    <div id="ntDepartures" className="w-full">
      <div className="uppercase text-xl bg-yellow-100 p-3 rounded-md tracking-wide">
        <sub>{direction.Text}</sub>
        <h3 className="font-black capitalize">{stop.label}</h3>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-200 uppercase">
              <th className="w-1/4 py-2">Route</th>
              <th className="w-1/2 py-2">Destination</th>
              <th className="w-1/4 py-2">Departs</th>
            </tr>
          </thead>
            <tbody>
              {departures.length > 0 && !loading &&
                departures.map(departure => 
                <tr className="bg-gray-100 border-b border-gray-300 rounded-lg" key={departure.DepartureTime}>
                  <td className="py-5 font-bold">{departure.Route}</td>
                  <td className="py-5">{departure.Description}</td>
                  <td className="py-5 font-bold">{departure.DepartureText}</td>
                </tr>
                )
              }
          </tbody>
        </table>
        {!departures.length && !loading &&
          <p>No departures scheduled.</p>
        }
      </div>
    </div>  
  )
}