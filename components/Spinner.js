import Loader from 'react-loader-spinner';

export default function Spinner({width}) {
  return (
    <Loader type="Rings"
    color="#4338CA"
    height={width} 
    width={width} />
  )
}
