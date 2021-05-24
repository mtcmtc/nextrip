export default function DepartureRow({ departure }){
	return(
		<tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 rounded-lg">
      <td className="py-5 font-bold">{departure.Route}</td>
      <td className="py-5">{departure.Description}</td>
      <td className="py-5 font-bold">
        <span className={`${departure.Actual ? 'animate-pulse text-red-800 dark:text-yellow-200' : ''}`}>
          {departure.DepartureText}
        </span>
      </td>
    </tr>
	)
}