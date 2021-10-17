import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signInWithRedirect } from '@firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';


export default function Signin() {
  const user = useContext(UserContext)
  const router = useRouter()
  const{register, setError, clearErrors, handleSubmit, formState} = useForm({
    mode: 'onSubmit',
    reValidateMode: "onChange"
  });
  const{ errors } = formState

  const onSubmitHandler = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        router.push('/')
      })
      .catch((error) => {
        setError('firebase', {
          type: "manual",
          message: "Email already in use"
        })
      })
  }

  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])


  const emailError = () => {
    return (
      <>
      {errors.email 
      ? 
      <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
        {errors.email.message}
      </span> 
      : errors.firebase ?
      <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
      {errors.firebase.message}
      </span> 
      : <></>}
    </>
    )
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src='/logo.png'
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address"
                    } 
                  })}
                  onFocus={() => clearErrors('firebase')}
                  id="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {emailError()}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters'
                    }
                  })}
                  id="password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errors.password &&  <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  {errors.password.message}
                                </span>
              }
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href='/login'>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login with credentials &rarr;
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 cursor-pointer">
              <div>
                <a
                  onClick={signInWithGoogle}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <img className='h-6 w-6' src="https://img.icons8.com/fluency/48/000000/google-logo.png"/>
                </a>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
