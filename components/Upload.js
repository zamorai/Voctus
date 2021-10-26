import { useState, useCallback, useEffect } from "react"
import DrinkCard from "../components/DrinkCard"
import { doc, setDoc } from "@firebase/firestore";
import { nanoid } from "nanoid";
import kebabCase from "lodash.kebabcase";

import axios from 'axios';
import { firestore } from "../lib/firebase";

export default function Search() {
  const[drinks, setDrinks] = useState(null) 
  const[anyDrink, setAnyDrink] = useState(false)

  useEffect(() => {
    const upload = async () => {
      const drinksRequest = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=`)
      setDrinks(drinksRequest.data.drinks)
      setAnyDrink(true)
    }
    upload()
  }, [])

  useEffect(() => {
    if (drinks) {
      console.log("Upload started")
      drinks.map((drink) => {
        const safeName = encodeURI(kebabCase(drink.strDrink))
        const id = `${safeName}-${nanoid(6)}`
        const drinkRef = doc(firestore, `drinks/${id}`)
        setDoc(drinkRef, {
          dateModified: drink.dateModified,
          id: id,
          alcoholic: drink.strAlcoholic,
          category: drink.strCategory,
          name: drink.strDrink,
          imageURL: drink.strDrinkThumb,
          favorites: 0,
          ratings: 0,
          ratingsTotal: 0,
          glass: drink.strGlass,
          imageAttribution: drink.strImageAttribution,
          ingredient1: drink.strIngredient1,
          ingredient2: drink.strIngredient2,
          ingredient3: drink.strIngredient3,
          ingredient4: drink.strIngredient4,
          ingredient5: drink.strIngredient5,
          ingredient6: drink.strIngredient6,
          ingredient7: drink.strIngredient7,
          ingredient8: drink.strIngredient8,
          ingredient9: drink.strIngredient9,
          ingredient10: drink.strIngredient10,
          ingredient11: drink.strIngredient11,
          ingredient12: drink.strIngredient12,
          ingredient13: drink.strIngredient13,
          ingredient14: drink.strIngredient14,
          ingredient15: drink.strIngredient15,
          instructions: drink.strInstructions,
          measure1: drink.strMeasure1,
          measure2: drink.strMeasure2,
          measure3: drink.strMeasure3,
          measure4: drink.strMeasure4,
          measure5: drink.strMeasure5,
          measure6: drink.strMeasure6,
          measure7: drink.strMeasure7,
          measure8: drink.strMeasure8,
          measure9: drink.strMeasure9,
          measure10: drink.strMeasure10,
          measure11: drink.strMeasure11,
          measure12: drink.strMeasure12,
          measure13: drink.strMeasure13,
          measure14: drink.strMeasure14,
          measure15: drink.strMeasure15,
        }, {merge: true})
      })
      console.log("Upload finished")
    }
  }, [anyDrink])

  return (
    <div className="search-placeholder-height">
      {drinks &&<DrinkCard drinks={drinks}/>}
    </div> 
  )
}