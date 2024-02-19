import React, { useContext, useState } from 'react'
import ItemsContext from '../context/items'

function Navbar() {
   const { total, setQuery } = useContext(ItemsContext);
   const [querySting, setQueryText] = useState('');

   const setSearchText = (query) => {
      setQueryText(query);
      setQuery(query)
   }

   return (
      <nav className="bg-[#2A59FE] border-gray-200 dark:bg-gray-900">
         <div
            className="max-w-screen-xl grid grid-cols-2 grid-rows-2 gap-1 px-4 py-2 xl:grid-cols-12 xl:grid-rows-1 xl:gap-7 xl:max-w-full xl:px-10">
            <a href="https://www.eteration.com/"
               className="flex items-center justify-center row-start-1 col-start-1 col-end-3 
               xl:col-start-1 xl:col-end-3 xl:space-x-3">
               <h2 className='text-2xl text-white font-extrabold'>Eteration</h2>
            </a>
            <div className="flex row-start-2 xl:row-start-1  xl:col-start-3 xl:col-end-10 md:order-1 w-96">
               <div className="relative w-2/5 sm:w-4/5 lg:w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                     <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                     </svg>
                     <span className="sr-only">Search icon</span>
                  </div>
                  <input value={querySting} onChange={(event) => setSearchText(event.target.value)} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
                  </input>
               </div>
            </div>
            <div className="row-start-2 xl:row-start-1 sm:col-start-2 flex items-center justify-center gap-3 xl:col-start-11">
               <div className='flex items-center gap-1'>
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h0" />
                  </svg>
                  <span className="block text-sm text-white">{total}₺</span>
               </div>
               <div className='flex items-center gap-1'>
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-width="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span className="block w-16 text-sm text-white">Uğur Alp</span>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar

