import { BeakerIcon, PlusSmIcon, XIcon } from "@heroicons/react/solid"
import { useEffect, useState } from 'react'

export const options = [
  {id: 1, name: '1/oz'},
  {id: 2, name: '2/oz'},
  {id: 3, name: '3/oz'},
  {id: 4, name: '4/oz'}
]

export default function Form({measure, setMeasure, inputCount, setInputCount, inputs, setInputs, inputsText, setInputsText}) { 
  const[maxIngredients, setMaxIngredients] = useState(1)
  const[errorType, setErrorType] = useState('')

  const inputsDisplay = inputs.map((input) => {
    return (
    <div key={input.value}>
      <div>
        <div className="mt-1 relative rounded-md shadow-sm flex items-center">
          <input
          type="text"
          value={inputsText[input.name]}
          onChange={(e) => setInputsText({...inputsText, [input.name]: e.target.value})}
          className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="Ingredient"
          />
          <div className="absolute inset-y-0 right-10 flex items-center">
            <label htmlFor="ingredient" className="sr-only">
              Ingredient
            </label>
            <select
            value={measure[input.name]}
            onChange={(e) => setMeasure({...measure, [input.name]: e.target.value})}
            name="ingredient"
            className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
            {options.map(option => {
              return <option key={option.id}>{option.name}</option>
            })}
            </select>
          </div>
          <XIcon className='ml-4 h-6 w-6 text-red-500 cursor-pointer' onClick={() => deleteInput(input.name)} />
        </div>
      </div>
    </div>
    )
  })

  useEffect(() => {
    console.log(inputsText)
    console.log(measure)
  }, [inputsText, measure])
  
  const deleteInput = (id) => {
    if (maxIngredients === 1) {
      setErrorType('few')
      return;
    }
    setErrorType('')
    setMaxIngredients(maxIngredients - 1)
    const newInput = inputs.filter((input) => input.name !== id)
    const {[id]: value, ...rest} = inputsText
    const{[id]: values, ...measureRest} = measure
    setInputs(newInput)
    setInputsText(rest)
    setMeasure(measureRest) 
  }

  const addInput = () => {
    if (maxIngredients === 15) {
      setErrorType('many')
      return;
    }
    setErrorType('')
    setMaxIngredients(maxIngredients + 1)
    setInputCount(inputCount + 1)
    const name = `ingredient${inputCount}`
    const newInput = { name }
    setInputs([...inputs, newInput])
    setInputsText({...inputsText, [name]: ''})
    setMeasure({...measure, [name]: options[1].name})
  }

  return (
    <div className="bg-white md-true-height flex flex-col justify-start py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <BeakerIcon className='h-12 w-12 text-indigo-800 mx-auto' />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Ingredients</h2>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <label htmlFor="email" className="mb-4 block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            {inputsDisplay}
            <div className='mt-4'>
              {errorType && 
              <span className="inline-flex items-center mb-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                {errorType === 'many' ? 'Max ingredients reached (15)' : 'At least 1 ingredient is needed'}
              </span>
              }
              <button
                onClick={() => addInput()}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coolGray-600 hover:bg-coolGray-700 focus:outline-none"
              >
                <PlusSmIcon className='w-6 h-6 text-green-500 mr-3' />
                Add Ingredient 
              </button>
            </div>


        </div>
      </div>
    </div>
  )
}
