export default function Select({ step, changeHandler, selectedState, data }){
	return(
      <select className="relative w-full bg-gray-100 border-2 border-gray-200 rounded-md font-bold p-3 mb-5" id={`nt${step}`} name={`nt${step}`} onChange={changeHandler} value={selectedState} aria-invalid="false">
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