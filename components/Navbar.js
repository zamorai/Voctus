import Link from 'next/link'
import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HeartIcon, MenuIcon, XIcon, BeakerIcon, UserIcon, UserCircleIcon } from '@heroicons/react/outline'
import { UserContext } from '../lib/context'
import { signOut } from '@firebase/auth'
import { auth } from '../lib/firebase'
import axios from 'axios'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Find Drinks', href: '/search', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const user = useContext(UserContext);
  console.log(user)
  const userNavigation = [
    { name: 'Your Profile', href: `/${user?.uid}` },
    { name: 'Sign out', href: '#' },
  ]

  const signOutUser = (buttonId) => {
    if (buttonId === "Sign out") {
      signOut(auth)
    }
  }

  return (
    <Disclosure as="nav" className="bg-coolGray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                
              {/*Left side menu*/}
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/*LOGO*/}
                <div className="flex-shrink-0 flex items-center cursor-pointer">
                  <Link href='/'>
                  <img
                    className="block h-8 w-auto"
                    src={'/logo.png'}
                    alt="Workflow"
                  />
                  </Link>
                </div>

                {/*Right Logo nav*/}
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link href={item.href}>
                      <a
                        key={item.name}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/*Right Side Menu*/}
              <div className="flex items-center">
                {user 
                ? 
                <>
                  {/*Action button */}
                  <div className="flex-shrink-0">
                    <Link href='/create'>
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                      <BeakerIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      <span>Mixology</span>
                    </button>
                    </Link>
                  </div>

                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <Link href={`/${user?.uid}/favorites`} >
                    <a
                      className="bg-gray-800 p-1 rounded-full text-coolGray-400 hover:text-white focus:outline-none"
                    >
                      <span className="sr-only">View Favorites</span>
                      <HeartIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                    </Link>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative z-10"> 
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                          <span className="sr-only">Open user menu</span>
                          {user?.photoURL ? <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="" /> 
                          : <UserCircleIcon className="text-coolGray-400 h-6 w-6 hover:text-white" aria-hidden="true" />}
                          
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                <a
                                  onClick={() => signOutUser(item.name)}
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </>
                :
                <Link href='/signin'>
                  <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                  >
                    <UserIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    <span>Sign In</span>
                  </button> 
                </Link>
                }
              </div>
 
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link href={item.href} >
                <a
                  key={item.name}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
                </Link>
              ))}
            </div>
            <div className={`pt-4 pb-3 border-t border-gray-700 ${user ? '' : 'hidden'}`}>
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  {user?.photoURL ? <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="" /> 
                  : <UserCircleIcon className="text-coolGray-400 h-9 w-9" aria-hidden="true" />}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user?.email}</div>
                </div>
                <Link href={`/${user?.uid}/favorites`} >
                <button
                  className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                </Link>
              </div>
              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {userNavigation.map((item) => (
                  <Link href={item.href}>
                  <a
                    onClick={() => signOutUser(item.name)}
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
