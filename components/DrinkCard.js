import Link from 'next/link'
import { BeakerIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'

export default function DrinkCard({ drinks }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {drinks.map((drink) => (
        <li
          key={drink.idDrink}
          className="col-span-1 flex relative flex-col text-center bg-white rounded-lg shadow-lg divide-y divide-gray-200"
        >
          <HeartIcon className="h-6 w-6 md:h-4 md:w-4 absolute right-2 top-2 text-red-600 cursor-pointer" />
          <div className="flex-1 flex flex-col p-8">
            <img className="w-56 h-56 flex-shrink-0 mx-auto rounded-md" src={drink.strDrinkThumb} alt="" />
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{drink.strDrink}</h3>

            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-500 text-sm">{drink.strIngredient1}</dd>
              <dt className="sr-only">Role</dt>
            </dl>

          </div>

          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="-ml-px w-0  flex-1 flex">
              <Link href={`/drinks/${drink.idDrink}`}> 
              <a
                href={`tel:${drink.idDrink}`}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-b-lg hover:bg-coolGray-600 group"
              >
                <BeakerIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" aria-hidden="true" />
                <span className="ml-3 group-hover:text-white">Mix it yourself</span>
              </a>
              </Link>
            </div>
          </div>

        </li>
      ))}
    </ul>
  )
}
