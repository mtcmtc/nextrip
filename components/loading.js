
export default function Loading ({loading}) {
  return <p className={`transition-opacity ${loading ? 'opacity-100' : 'opacity-0'}`}>Loading...</p>
}