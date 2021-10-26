import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, BeakerIcon } from '@heroicons/react/outline'
import Spinner from '../../components/Spinner'
import { firestore } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, onSnapshot, query, updateDoc, increment } from 'firebase/firestore'
import Reviews from '../../components/drink/Reviews'
import { UserContext } from '../../lib/context';
import moment from 'moment'
import HeartButton from '../../components/HeartButton';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps({ params }) {
  const slug = params.slug
  const drinksRequest = doc(firestore, `drinks/${slug}`)
  const reviewRequest = collection(firestore, `drinks/${slug}/reviews`)
  const drinksResponse = await getDoc(drinksRequest)
  const reviewResponse = await getDocs(reviewRequest)
  const tempReviews = []
  reviewResponse.forEach((doc) => {
    tempReviews.push(doc.data())
  })
  
  return {
    props: {
      drinksRequest: drinksResponse.data(),
      reviews: tempReviews
    }
  }
}

export default function Drink({drinksRequest, reviews}) {
  const user = useContext(UserContext)
  const[drink, setDrink] = useState(drinksRequest)
  const[reviewText, setReviewText] = useState('')
  const[desc, setDesc] = useState('')
  const[reviewStars, setReviewStars] = useState(0)
  const[alreadyReviewed, setAlreadyReviewed] = useState(false)
  const [allReviews, setAllReviews] = useState(reviews)

  useEffect(() => {
    const getUserReview = async () => {
      const alreadyReviewedRef = doc(firestore, `drinks/${drinksRequest.id}/reviews/${user?.uid}`)
      const alreadyReviewedSnap = await getDoc(alreadyReviewedRef)
      if (alreadyReviewedSnap.data()) {
        setAlreadyReviewed(true)
      }
    }
    getUserReview()
  }, [user])

  useEffect(() => {
    const q = query(collection(firestore, `drinks/${drink.id}/reviews`))
    const unsub = onSnapshot(q, (doc) => {
      const tempReviews = []
      doc.forEach((review) => {
        tempReviews.push(review.data())
      })
      setAllReviews(tempReviews)
    })
    return () => unsub()
  }, [])

  const colorStars = (rating) => {
    setReviewStars(rating)
  }

  const handleReviewSubmit = async () => {
    setAlreadyReviewed(true)
    const userReviewRef = doc(firestore, `drinks/${drinksRequest.id}/reviews/${user.uid}`)
    const baseDrinkReview = doc(firestore, `drinks/${drinksRequest.id}`)
    setDoc(userReviewRef, {
      id: user.uid,
      stars: reviewStars,
      title: reviewText,
      description: desc,
      time: moment().format('MMMM DD, YYYY'),
      email: user.email
    }, {merge: true})

    await updateDoc(baseDrinkReview, {
      ratings: increment(1),
      ratingsTotal: increment(reviewStars)
    })

  }

  const displayIngredients = () => {
    const drinkIngredients = []
    for (let i = 1; i <= 15; i++) {
      let ingredientCount = `ingredient${i}`
      if (drink[ingredientCount]) {
        drinkIngredients.push(drink[ingredientCount])
      }
    }
    return (
      <>
        {drinkIngredients.map((ingredient, idx) => (
          <div className='flex items-center justify-between px-4 py-2'>
            <p>{ingredient}</p>
            <p>{drink[`measure${idx+1}`]}</p>
          </div>
        ))}
      </>
    )
  }
  

  return (
    <div className="bg-white">
      {drink ?
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{drink.name}</h1>
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
                            drink.ratingsTotal/drink.ratings > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{drink.ratings} reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{drink.instructions}</p>
            </div>

            <div className="mt-6 flex items-center">
              <BeakerIcon className="flex-shrink-0 w-5 h-5 text-indigo-600" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">{drink.glass}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img src={drink.imageURL} className="w-full h-full object-center object-cover" />
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
                <HeartButton id={drink.id} single={true} favs={drink.favorites}/>
              </div>
            </div>

            <div className='flex flex-col divide-y divide-coolGray-200'>
              {displayIngredients()}
            </div>

          </section>
        </div>

        <div className="col-span-2 py-16  sm:py-24 ">

          {!alreadyReviewed &&
          <>
          <div className="bg-coolGray-50 shadow-md z-10 relative sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6 flex flex-col">
              <div className="pb-5 flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Leave your review</h3>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <button
                  type="button"
                  onClick={handleReviewSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div>
                <div className='flex items-center mb-3'>
                  {[1,2,3,4,5].map((rating) => (
                    <StarIcon
                      key={rating}
                      onClick={() => colorStars(rating)}
                      className={classNames(
                        reviewStars >= rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className='text-center md:text-left mb-4'>
                  <input
                    type="text"
                    className="shadow-sm w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="What's most important to know?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className=''>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder={'What did you like or dislike about the drink?'}
                  />
                </div>
              </div>
            </div>
          </div>
          </>
          }
          <Reviews reviews={allReviews} />
        </div>
      </div>
      : <Spinner width={100} />}
    </div>
  )
}
