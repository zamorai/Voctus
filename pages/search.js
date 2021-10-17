import { SearchIcon } from "@heroicons/react/solid"
import { useState, useCallback, useEffect } from "react"
import DrinkCard from "../components/DrinkCard"
import debounce from 'lodash.debounce';
import axios from 'axios';

export default function Search() {
  const[drinks, setDrinks] = useState(null) 
  const[searchValue, setSearchValue] = useState('')

  const getDrinks = useCallback(
    debounce(async (searchValue) => {
      if (searchValue.length > 2) {
        const cleansedInput = searchValue.trim()
        const drinksRequest = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cleansedInput}`)
        setDrinks(drinksRequest.data.drinks)
      }
  }, 500), []);

  useEffect(() => {
    getDrinks(searchValue)
  }, [searchValue])

  return (
    <div className="bg-white pb-8">
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Search Cocktails</h1>
        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
          The secret to a good party? Raise the spirits (and glasses) with a good drink.
        </p>
      </div>

      <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-6xl">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              name="search"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400  sm:text-sm"
              placeholder="Search"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
      </div>
    </div>

    <div className="search-placeholder-height pt-8 sm:pt-8 xl:max-w-7xl xl:mx-auto xl:px-8">
      {drinks ? <DrinkCard drinks={drinks}/> : 
      <div className="flex items-center justify-center">
        search for drinks  
      </div>}
    </div>

    
    </div>
  )
}
