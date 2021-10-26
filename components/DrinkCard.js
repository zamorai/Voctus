import Link from 'next/link'
import { BeakerIcon, StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import HeartButton from './HeartButton'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DrinkCard({ drinks }) {
  const user = useContext(UserContext)
  return (
    <ul role="list" className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {drinks.map((drink) => (
        <Link href={`/drinks/${drink.id}`}> 
        <li
          key={drink.id}
          className="col-span-1 border border-1 cursor-pointer border-coolGray-200 flex relative flex-col text-center bg-white rounded-lg shadow-sm hover:shadow-lg transition duration-100 ease hover:transform hover:-translate-y-0.5"
        >
          {user && <HeartButton id={drink.id} favs={drink.favorites}/>}
          <div className="flex-1 flex flex-col">
            <img className="w-full ratio-1 object-contain flex-shrink-0 mx-auto rounded-t-md" src={drink.imageURL} alt="" />
            <div className='flex items-center justify-center px-2 mt-4'>
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    drink.ratingsTotal / drink.ratings > rating ? 'text-yellow-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className='flex items-center justify-center px-2 my-4'>
              <h3 className="text-gray-900 text-md font-medium">{drink.name}</h3>
            </div>
            <div className='flex items-center justify-between px-2 py-2'>
              <h3 className="text-gray-900 text-sm font-medium">{drink.alcoholic}</h3>
              <p className="text-gray-500 text-sm">{drink.ingredient1}</p>
            </div>
          </div>

        </li>
        </Link>
      ))}
    </ul>
  )
}
