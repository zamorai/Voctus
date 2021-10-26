import { SearchIcon } from "@heroicons/react/solid"
import { useState, useCallback, useEffect } from "react"
import debounce from 'lodash.debounce';
import { firestore } from "../lib/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore'
import algoliasearch from 'algoliasearch'
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom'
import HeartButton from "../components/HeartButton";
import { HeartIcon, BeakerIcon } from "@heroicons/react/solid";
import Link from 'next/link' 
import DrinkCard from "../components/DrinkCard";

const searchClient = algoliasearch('64Z77SARNJ', '4e4c77ec16757d8f0e2b76d1609a7069')

export default function Search() {

  const displayCard = ({hits}) => {
    return (
      <>
      <DrinkCard drinks={hits} />
      </>
    )
  }
  const CustomHits = connectHits(displayCard)

  const SearchBox = ({currentRefinement, refine}) => {
    return (
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
            value={currentRefinement}
            onChange={(e) => refine(e.currentTarget.value)}
          />
      </div>                          
    </div>
  </div>
    )
  }
  const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <div className="bg-white pb-8">
      <InstantSearch searchClient={searchClient} indexName="drinks">
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Search Cocktails</h1>
        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
          The secret to a good party? Raise the spirits (and glasses) with a good drink.
        </p>
      </div>

    <CustomSearchBox defaultRefinement="margarita" />

    <div className="search-placeholder-height pt-8 sm:pt-8 xl:max-w-7xl xl:mx-auto xl:px-8">
        <CustomHits />
    </div>

    </InstantSearch>
    </div>
  )
}