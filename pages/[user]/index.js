import { useState, useContext, useEffect } from 'react' 
import { firestore } from '../../lib/firebase'
import { onSnapshot, doc, query, collection, where } from '@firebase/firestore'
import { UserContext } from '../../lib/context'
import DrinkCard from '../../components/DrinkCard'

export default function User() {
  const user = useContext(UserContext)
  const[drinks, setDrinks] = useState([])
  // update the drink to know to make the button red
  useEffect(() => {
    const q = query(collection(firestore, `users/${user?.uid}/userDrinks`))

    const unsub = onSnapshot(q, (drinkSnapshot) => {
      const tempDrinks = []
      drinkSnapshot.forEach((doc) => {
        console.log(doc.data())
        tempDrinks.push(doc.data())
      })
      setDrinks(tempDrinks)
    })

    return () => unsub()
  }, [user])

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-thin text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Your Drinks
          </p>
        </div>

        <div className="mt-12">
          <DrinkCard drinks={drinks} />
        </div>
      </div>
    </div>
  )
}
