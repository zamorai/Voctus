import Toggle from "./Toggle";
import Dropdown, { people } from "./Dropdown";
import { useState } from 'react'  
import ImageUploader from "./ImageUploader";

export default function DescForm({name, setName, description, setDescription, downloadUrl, setDownloadUrl, enabled, setEnabled, selected, setSelected}) {

  return (
    <div className="space-y-8 divide-y divide-gray-200 bg-white relative z-0 px-6 py-10 mb-24">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Instructions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Additional information about how to prepare your drink
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name your drink
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Preparation details
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Cocktail image
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <ImageUploader downloadUrl={downloadUrl} setDownloadUrl={setDownloadUrl} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
              <Dropdown selected={selected} setSelected={setSelected} /> 
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Alcoholic
              </label>
              <div className="mt-1 sm:mt-0 flex items-center ">
                <Toggle enabled={enabled} setEnabled={setEnabled} />
                <p className='ml-8'>Alcoholic</p>
              </div>
            </div>

            

          </div>
        </div>
      </div>
    </div>
  )
}


