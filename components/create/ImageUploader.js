import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from '@firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../lib/firebase';

export default function ImageUploader({downloadUrl, setDownloadUrl}) {
    const[uploading, setUploading] = useState(false)
    const[progress, setProgress] = useState(0)
    const[storagePath, setStoragePath] = useState('')

    const uploadImage = async (e) => {
        // Get image
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split('/')[1];
        const id = Date.now()
        setStoragePath(`uploads/drinks/${id}.${extension}`)

        // Make reference to storage bucket location
        const storageRef = ref(storage, `uploads/drinks/${id}.${extension}`);
        setUploading(true)

        // Starts the upload
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const pgs = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                setProgress(pgs)
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadUrl(downloadURL)
                    setUploading(false)
                });
            }
        )
    }

    const deleteImage = () => {
      const deleteRef = ref(storage, storagePath)
      deleteObject(deleteRef)
      setDownloadUrl(null)
    }


    return (
    <>
    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      {downloadUrl ? 
      <img src={downloadUrl} />
      :
      <>
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload a file</span>
            <input onChange={uploadImage} id="file-upload" accept="image/x-png,image/gif,image/jpeg" name="file-upload" type="file" className="sr-only" />
          </label>
          <p className="pl-1">{downloadUrl ? downloadUrl : 'or drag and drop'}</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
      </> 
      }
    </div>
    {downloadUrl &&
    <button
        onClick={deleteImage}
        type="button"
        className="mt-4 w-full max-w-lg inline-flex justify-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-coolGray-50 bg-red-500 hover:bg-red-600 focus:outline-none"
      > 
        Upload another image
      </button>
    }
    </>
    )
}