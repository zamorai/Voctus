import React, { useContext, useState } from 'react'
import Form, {options} from '../components/create/Form';
import DescForm from '../components/create/DescForm';
import { people } from '../components/create/Dropdown'
import moment from 'moment';
import { nanoid } from "nanoid";
import kebabCase from "lodash.kebabcase";
import { firestore } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { UserContext } from '../lib/context';


export default function Create() {
  const[inputCount, setInputCount] = useState(2)
  const[inputs, setInputs] = useState([{name: 'ingredient1'}])
  const[inputsText, setInputsText] = useState({
    ingredient1: '',
  })
  const[measure, setMeasure] = useState({
    ingredient1: options[2].name
  })
  const [enabled, setEnabled] = useState(false)
  const [selected, setSelected] = useState(people[3])
  const[name, setName] = useState('')
  const[description, setDescription] = useState('')
  const[downloadUrl, setDownloadUrl] = useState(null)
  const user = useContext(UserContext);
  const router = useRouter()
   

  const submitHandler = (e) => {
    e.preventDefault()

    const alcoholic = enabled ? 'Alcoholic' : 'Non-Alcoholic'
    const safeName = encodeURI(kebabCase(name))
    const id = `${safeName}-${nanoid(6)}`
    const returnObject = {
      alcoholic,
      category: 'Cocktail',
      dateModified: moment().format('MMMM Do YYYY, h:mm:ss a'),          
      glass: selected.name,           
      id,           
      imageAttribution: '', 
      imageURL: downloadUrl, 
      ingredient1: null, 
      ingredient10: null, 
      ingredient11: null, 
      ingredient12: null, 
      ingredient13: null, 
      ingredient14: null, 
      ingredient15: null, 
      ingredient2: null, 
      ingredient3: null, 
      ingredient4: null, 
      ingredient5: null, 
      ingredient6: null, 
      ingredient7: null, 
      ingredient8: null, 
      ingredient9: null, 
      instructions: description, 
      measure1: null, 
      measure10: null, 
      measure11: null, 
      measure12: null, 
      measure13: null, 
      measure14: null, 
      measure15: null, 
      measure2: null, 
      measure3: null, 
      measure4: null, 
      measure5: null, 
      measure6: null, 
      measure7: null, 
      measure8: null, 
      measure9: null, 
      name: name, 
      createdBy: user.uid || undefined,
      favorites: 0,
      ratings: 0,
      ratingsTotal: 0
    }

    let num = 0
    inputs.forEach((input) => {
      num++
      const idName = `ingredient${num}`
      const idMeasure = `measure${num}`
      const text = inputsText[input.name]
      const measureAmount = measure[input.name]
      returnObject[idName] = text
      returnObject[idMeasure] = measureAmount
    })

    const drinkRef = doc(firestore, `drinks/${id}`)
    const userRef = doc(firestore, `users/${user.uid}/userDrinks/${id}`)
    setDoc(drinkRef, returnObject)
    setDoc(userRef, returnObject)
    router.push('/')
  }

  return (
    <div className="md-true-height">
      <div className='grid grid-cols-2 bg-white'>
        <div className='md:col-span-1 col-span-2'>
          <Form measure={measure} setMeasure={setMeasure} inputCount={inputCount} setInputCount={setInputCount} inputs={inputs} setInputs={setInputs} inputsText={inputsText} setInputsText={setInputsText} />
        </div>
        <div className='md:col-span-1 col-span-2 md:inline bg-white relative'>
          <DescForm description={description} setDescription={setDescription} downloadUrl={downloadUrl} setDownloadUrl={setDownloadUrl} enabled={enabled} setEnabled={setEnabled} selected={selected} setSelected={setSelected} name={name} setName={setName} />
          <button
            onClick={(e) => submitHandler(e)}
            type="button"
            className="mb-8 absolute bottom-0 left-1/2 md:left-0 transform -translate-x-56 inline-flex items-center px-48 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
