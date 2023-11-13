import './App.css'
import { Link } from 'react-router-dom';
import { AuthDetails } from './components/auth/AuthDetails'
import {useData} from './DataContext';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from './AuthContext'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: '',
  // 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-l.cdn.bubble.io%2Ff1512936020165x278911292087286720%2FA.png?w=64&h=64&auto=compress&dpr=1&fit=max'
  // 'https://upload.wikimedia.org/wikipedia/commons/0/07/Eo_circle_pink_white_letter-u.svg'
}

const substringsToCheck = ['csc131team7', 'admin'];

const navigation = [
  { name: 'Home', to: '/Home', current: false },
  { name: 'Archived Devices', to: '/Archive', current: false },
  { name: 'Organization', to: '/Organizations', current: false },
  { name: 'Search Tests', to: '/Search', current: false },
]

const userNavigation = [
  { name: 'Your Profile', to: '/Organizations' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const {userData} = useData();
    const { authUser, loading } = useAuth();

    return ( 
        <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12"
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/California_State_University%2C_Sacramento_seal.svg"
                        alt="Your Company"
                      />
                    </div>
                    <div className="text-white ml-3 text-xl font-bold">
                        Team Cyber Savants
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                      {/* {navigation.map((item) => (
                            <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-base font-medium'
                            )}
                            >
                            {item.name}
                            </Link>
                        ))} */}
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'  // This is applied if item.current is true
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',  // This is applied if item.current is false
                              'rounded-md px-3 py-2 text-base font-medium' // These styles are applied unconditionally
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                        {(userData?.role === 'owner' || userData?.role === 'admin') && <Link to ='/AdminPage' className ='"text-lg text-black hover:scale-105 hover:text-blue-800'>Admin</Link>}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* <div class="text-white text-base">
                        <AuthDetails />
                      </div> */}


                      {authUser ?
                          <div className="flex relative items-center flex-row justify-between">
                              <p className="text-white text-base">Signed in as{' '} 
                              <strong className="font-bold text-base">
                                  {userData? userData.displayName: 'Loading...'}
                              </strong>
                              </p>
                          </div> : 
                          <div className="text-white text-base">Welcome, please sign in</div>
                      }
                      
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                            <img className="h-10 w-10 rounded-full" src={
                            userData && substringsToCheck.some(substring => userData.email.includes(substring))
                            ? 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-l.cdn.bubble.io%2Ff1512936020165x278911292087286720%2FA.png?w=64&h=64&auto=compress&dpr=1&fit=max'
                            : 'https://upload.wikimedia.org/wikipedia/commons/0/07/Eo_circle_pink_white_letter-u.svg'
                            }
                            alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                
                                {({ active }) => (
                                  <Link
                                    to={item.to}
                                    className={classNames(
                                      active ? 'bg-gray-100 text-black' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}>
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                              
                            ))}
                            {/* <button onClick={handleSignOut} className="text-white w-32 h-10 text-lg font-bold border ml-8 mr-5 bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Sign Out</button> */}
                            <AuthDetails />
                          
                          
                          
                          
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                      // <Disclosure.Button
                      //   key={item.name}
                      //   as="a"
                      //   to={item.to}
                      //   className={classNames(
                      //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      //     'block rounded-md px-3 py-2 text-base font-medium'
                      //   )}
                      //   aria-current={item.current ? 'page' : undefined}
                      // >
                      //   {item.name}
                      // </Disclosure.Button>

                      <Link 
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <Disclosure.Button as="div">
                        {item.name}
                      </Disclosure.Button>
                    </Link>

                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={
                        userData && substringsToCheck.some(substring => userData.email.includes(substring))
                        ? 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-l.cdn.bubble.io%2Ff1512936020165x278911292087286720%2FA.png?w=64&h=64&auto=compress&dpr=1&fit=max'
                        : 'https://upload.wikimedia.org/wikipedia/commons/0/07/Eo_circle_pink_white_letter-u.svg'
                        }
                      alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{
                      // userData.displayName
                        userData
                        ? userData.displayName
                        : 'Placeholder'
                      }</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{
                      // userData.email
                        userData
                        ? userData.email
                        : 'Placeholder'
                      }</div>
                    </div>
                    {/* <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      // <Disclosure.Button
                      //   key={item.name}
                      //   as="a"
                      //   to={item.to}
                      //   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      // >
                      //   {item.name}
                      // </Disclosure.Button>

                    <Link 
                    key={item.name}
                      as="a"
                      to={item.to}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <Disclosure.Button as="div">
                        {item.name}
                      </Disclosure.Button>
                    </Link>

                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </div>

        // <header className="z-10 sticky top-0 w-full flex overflow-auto items-center flex-col justify-start ">
        //     <div className="overflow-auto w-full flex items-center pt-5 pb-5 border-b border-black bg-white px-8 justify-between">
        //     <div className="flex relative space-x-8">
        //         <h1 className="text-xl font-bold pr-20">Cyber Savants Test Tracker</h1>
        //         <Link to="/Home" className="text-lg pl-20 text-black hover:scale-105 hover:text-blue-800">Home</Link>
        //         <Link to="/Archive" className="text-lg text-black hover:scale-105 hover:text-blue-800">Archived Devices</Link>
        //         <Link to="/DevicePage" className="text-lg text-black hover:scale-105 hover:text-blue-800">Organization</Link>
        //         <Link to="/Demo" className="text-lg text-black hover:scale-105 hover:text-blue-800">Other</Link>
        //         {(userData?.role === 'owner' || userData?.role === 'admin') && <Link to ='/AdminPage' className ='"text-lg text-black hover:scale-105 hover:text-blue-800'>Admin</Link>}
        //     </div>
        //     <input
        //         type="text"
        //         placeholder="Search..."
        //         className="w-400 h-35 text-lg pl-10"
        //     />
        //     <div className="flex items-center space-x-4">
        //         <AuthDetails />
        //     </div>
        //     </div>
        // </header>
    );
};

export default Navbar;

// import './App.css'
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return ( 
//         <header data-role="Header" className="home-top-header">
//             <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
//             <div className="home-top-header-nav">
//                 <Link to="/" className="home-navbar-text">Home</Link>
//                 <Link to="/Archive" className="home-navbar-text">Archived Devices</Link>
//                 <Link to="/" className="home-navbar-text">Organization</Link>
//                 <Link to="/Demo" className="home-navbar-text">Other</Link>
//             </div>
//             <input type="text"
//                 placeholder="Search..."
//                 className="home-search-bar input"
//             />
//             <div className="home-top-header-login">
//                 <Link to="/Login" className="home-login-button">Login</Link>
//                 <Link to="/Register" className="home-register-button">Register</Link>
//             </div>
//         </header>
//     );
// }

// export default Navbar;