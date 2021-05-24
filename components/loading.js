
export default function Loading ({loading}) {
  return <p class={`transition-opacity ${loading ? 'opacity-100' : 'opacity-0'}`}>Loading...</p>
}