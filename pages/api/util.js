import 'url'

const url = new URL('https://svc.metrotransit.org/');
url.search = '?format=json';

export async function fetchData(routeId, directionId, placeCode){
	let path = '/nextrip/routes';
	if(routeId) path = `/nextrip/directions/${routeId}`
	if(directionId) path =`/nextrip/stops/${routeId}/${directionId}`
	if(placeCode) path = `/nextrip/${routeId}/${directionId}/${placeCode}`
	
	url.pathname = path;

	const res = await fetch(url.href)
	const data = await res.json()
  if(!data){
  	throw new Error(data.message)
  }
  
  return data
}