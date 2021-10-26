import React, { useContext, useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { UserContext } from '../lib/context'
import { firestore } from '../lib/firebase'
import { doc, onSnapshot, setDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';

export default function HeartButton({ id, single=false, favs }) {
  const user = useContext(UserContext)
  const[exists, setExists] = useState('')
  const[favCount, setFavCount] = useState(0)
  const classNameHearts = single ? "flex-shrink-0 w-5 h-5 text-red-500" : 'h-6 w-6 md:h-4 md:w-4 text-red-600 cursor-pointer'
  const classNameContainer = single ? 'inline-flex items-center px-4 py-2 border border-coolGray-300 rounded-md shadow-sm text-sm font-medium bg-coolGray-50 hover:bg-coolGray-100 focus:outline-none' : 'cursor-pointer flex items-center justify-between py-1 px-2 bg-coolGray-200 bg-opacity-50 rounded-sm absolute right-2 top-2'
  const classNameText = single ? 'hidden' : 'text-sm ml-1'
  // update the drink to know to make the button red
  useEffect(() => { 
    const unsub = onSnapshot(doc(firestore, `drinks/${id}/favorites/${user?.uid}`), (doc) => {
      setExists(doc.data()?.uid)
    })
    return () => unsub()
  }, [])

  useEffect(() => { 
    const unsub = onSnapshot(doc(firestore, `drinks/${id}`), (doc) => {
      setFavCount(doc.data()?.favorites)
    })
    return () => unsub()
  }, [])
  
  const deleteFavorite = async (e) => {
    e.stopPropagation()
    await deleteDoc(doc(firestore, `drinks/${id}/favorites/${user.uid}`))
    await deleteDoc(doc(firestore,`users/${user.uid}/favorites/${id}`))
    const favsRef = doc(firestore, `drinks/${id}`)
    await updateDoc(favsRef, {
      favorites: increment(-1)
    })
  }

  const addFavorite = async (e) => {
    e.stopPropagation()
    const favoriteRef = doc(firestore, `drinks/${id}/favorites/${user.uid}`)
    const userRef = doc(firestore, `users/${user.uid}/favorites/${id}`)
    setDoc(favoriteRef, {uid:user.uid}, {merge:true})
    setDoc(userRef, {id: id}, {merge: true})
    const favsRef = doc(firestore, `drinks/${id}`)
    await updateDoc(favsRef, {
      favorites: increment(1)
    })
  }

  return (
    <>
    {exists ? 
    <div onClick={deleteFavorite} className={classNameContainer}>
      <HeartIconSolid className={classNameHearts}  /> 
      <p className={classNameText}>{favCount}</p>
    </div>
    : 
    <div onClick={addFavorite} className={classNameContainer}>
      <HeartIcon className={classNameHearts} />
      <p className={classNameText}>{favCount}</p>
    </div>
    }
    </>
  )
}

