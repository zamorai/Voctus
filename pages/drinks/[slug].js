import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { ShieldCheckIcon, HeartIcon, BeakerIcon } from '@heroicons/react/outline'
import Spinner from '../../components/Spinner'

const product = {
  name: 'Everyday Ruck Snack',
  href: '#',
  price: '$220',
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
  imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    { id: 1, name: 'Travel', href: '#' },
    { id: 2, name: 'Bags', href: '#' },
  ],
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps({ params }) {
  const slug = params.slug
  const drinksRequest = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${slug}`)
  
  return {
    props: {
      drinksRequest: drinksRequest.data.drinks
    }
  }
}

export default function Drink({drinksRequest}) {
  const router = useRouter()
  const[drink, setDrink] = useState(...drinksRequest)

  console.log(drink)
  return (
    <div className="bg-white">
      {drink ?
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{drink.strDrink}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <div>
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{drink.strInstructions}</p>
            </div>

            <div className="mt-6 flex items-center">
              <BeakerIcon className="flex-shrink-0 w-5 h-5 text-indigo-600" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">{drink.strGlass}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img src={drink.strDrinkThumb} alt={product.imageAlt} className="w-full h-full object-center object-cover" />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <div className="pb-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Ingredients</h3>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-coolGray-300 rounded-md shadow-sm text-sm font-medium text-white bg-coolGray-50 hover:bg-coolGray-100 focus:outline-none"
                >
                  <HeartIcon className="flex-shrink-0 w-5 h-5 text-red-500" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className='flex flex-col'>
              <p>{drink.strIngredient1} {drink.strMeasure1}</p>
              <p>{drink.strIngredient2} {drink.strMeasure2}</p>
              <p>{drink.strIngredient3} {drink.strMeasure3}</p>
            </div>

          </section>
        </div>
      </div>
      : <Spinner width={100} />}
    </div>
  )
}
