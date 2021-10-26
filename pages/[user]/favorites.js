import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import DrinkCard from '../../components/DrinkCard'

export async function getServerSideProps({query}) {
  const id = query.user
  const drinkSnapshot = await getDocs(collection(firestore, `users/${id}/favorites`))
  const tempDrinks = []
  drinkSnapshot.forEach((doc) => {
    tempDrinks.push(doc.data().id)
  })

  return {
    props: {
      initialDrinks: tempDrinks
    }
  }
}

export default function Favorites({initialDrinks}) {
  const[drinks, setDrinks] = useState([])
  
  useEffect(() => {
    const getDrinks = async () => {
      const drinkQuery = query(collection(firestore, 'drinks'), where("id", "in", initialDrinks));
      const drinkSnapshot = await getDocs(drinkQuery);
      const tempDrinks = []
      drinkSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempDrinks.push(doc.data())
        });
      setDrinks(tempDrinks)
    }
    if(initialDrinks.length > 0) {
      getDrinks()
    }
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-thin text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Favorite Drinks
          </p>
        </div>

        <div className="mt-12">
          <DrinkCard drinks={drinks} />
        </div>
      </div>
    </div>
  )
}
