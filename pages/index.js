import Head from 'next/head';

import DrinkCard from '../components/DrinkCard';
import { useContext, useState } from 'react';
import { UserContext } from '../lib/context';
import { firestore } from '../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import Link from 'next/link'

export async function getStaticProps(context) {

  const drinksRef = collection(firestore, 'drinks')
  const q = query(drinksRef, where('category', '==', 'Ordinary Drink'), limit(20))
  const drinkSnapshot = await getDocs(q)
  const tempDrinks = []
  drinkSnapshot.forEach((doc) => {
    tempDrinks.push(doc.data())
  })
  
  return {
    props: {
      drinksRequest: tempDrinks
    }
  }
}

export default function Home({drinksRequest}) {
  const[drinks, setDrinks] = useState(drinksRequest)
  const user = useContext(UserContext)

  return (
    <div className="bg-white pb-8">
      <Head>
        <title>Nauta</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Hero />
      <section aria-labelledby="category-heading" className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8">
          <div className="mb-4 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
            <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
              Popular Drinks
            </h2>
            <Link href='/search'>
              <a className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                Discover<span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>

          <DrinkCard drinks={drinks} />
          
          <div className="mt-6 px-4 sm:hidden">
          <Link href='/search'>
            <a className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Discover<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
          </div>
        </section>
      
    </div>
  )
}


function Hero() {
  return (
<main className="lg:relative">
    <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
      <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
          <span className="block xl:inline">Data to enrich your</span>{' '}
          <span className="block text-indigo-600 xl:inline">online business</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat fugiat aliqua.
        </p>
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Live demo
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={'/bar.png'}
        alt=""
      />
    </div>
  </main>
  )
}


