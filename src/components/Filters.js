import React, { useContext, useState } from 'react'
import ItemsContext from '../context/items'
import Spinner from './Spinner';
import SORTTYPE from "../constants/sort";

function Filters() {
   const { 
      models, 
      brands, 
      setSortContext, 
      updateSelectedModels, 
      updateSelectedBrands,
      searchBrands,
      searchModels  
   
   } = useContext(ItemsContext);
   const [ sort, setSortType ]  = useState(SORTTYPE.oldNew);
   const [ searchB, setBrandQuery] = useState('');
   const [ searchM, setModelQuery] = useState('');

   const selectModel = (selection) => {
      updateSelectedModels(selection);
   }
   
   const selectBrand = (selection) => {
      updateSelectedBrands(selection);
   }

   const renderModels = models.map((model, index) => {
      return (
         <li key={index} style={ model.displayed ? { display: 'block'} : { display: 'none' }} className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3">
               <input id="vue-checkbox" type="checkbox" value={model.label} checked={model.checked} onChange={(event) => {selectModel({[model.label]: event.target.checked})}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
               </input>
               <label for="vue-checkbox" className="w-full py-2 ms-2 text-base xl:text-sm font-normal text-gray-900">{model.label}</label>
            </div>
         </li>
      )
   });
   const renderBrands = brands.map((brand, index) => {
      return (
         <li key={index} style={ brand.displayed ? { display: 'block'} : { display: 'none' }} className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center ps-3 ">
               <input id="laravel-checkbox" type="checkbox" value={brand.label} checked={brand.checked} onChange={(event) => {selectBrand({[brand.label]: event.target.checked})}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
               </input>
               <label for="laravel-checkbox" className="w-full py-2 ms-2 text-base xl:text-sm font-normal text-gray-900">{brand.label}</label>
            </div>
         </li>
      )
   });

   const setListSort = (sortType) => {
      setSortType(sortType);
      setSortContext(sortType);
   }

   const searchForBrands = (txt) => {
      setBrandQuery(txt);
      searchBrands(txt);
   }
   const searchForModels = (txt) => {
      setModelQuery(txt);
      searchModels(txt);
   }


   return (
      <div className='row-start-1 row-end-4 xl:col-start-1 xl:col-end-3'>
         <form className='flex flex-col gap-1 h-36 pb-48'>
            <h3 className="font-400 text-[#333333b3] text-xs">Sort by</h3>
            <ul className="w-full xl:w-48 xl:text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25);]">
               <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                     <input id="list-radio-license" type="radio" value={SORTTYPE.oldNew} checked={sort === SORTTYPE.oldNew} onChange={event => {setListSort(event.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                     </input>
                     <label for="list-radio-license" className="w-full py-2 ms-2 text-base xl:text-sm  font-normal text-gray-900 dark:text-gray-300">Old to new </label>
                  </div>
               </li>
               <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                     <input id="list-radio-id" type="radio" value={SORTTYPE.newOld} checked={sort === SORTTYPE.newOld} onChange={event => {setListSort(event.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                     </input>
                     <label for="list-radio-id" className="w-full py-2 ms-2 text-base xl:text-sm  font-normal text-gray-900 dark:text-gray-300">New to old</label>
                  </div>
               </li>
               <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                     <input id="list-radio-military" type="radio" value={SORTTYPE.highLow} checked={sort === SORTTYPE.highLow} onChange={event => {setListSort(event.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                     </input>
                     <label for="list-radio-military" className="w-full py-2 ms-2 text-base xl:text-sm  font-normal text-gray-900 dark:text-gray-300">Price hight to low</label>
                  </div>
               </li>
               <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                     <input id="list-radio-passport" type="radio" value={SORTTYPE.lowHigh} checked={sort === SORTTYPE.lowHigh} onChange={event => {setListSort(event.target.value)}} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                     </input>
                     <label for="list-radio-passport" className="w-full py-2 ms-2 text-base xl:text-sm  font-normal text-gray-900 dark:text-gray-300">Price low to High</label>
                  </div>
               </li>
            </ul>
         </form>
         <div className='flex flex-col gap-1 pb-6'>
            <h3 className="font-400 text-[#333333b3] text-xs">Brands</h3>
            <ul className="w-full xl:w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25);] dark:bg-gray-700 dark:border-gray-600 dark:text-white">

               <form className='pt-4'>
                  <label for="default-search" className="mb-2 text-base xl:text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative flex justify-center">
                     <div className="absolute inset-y-0 start-10 xl:start-6 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                     </div>
                     <input value={searchB} onChange={(event) => searchForBrands(event.target.value)} type="search" id="default-search" className="block w-3/4 p-2 ps-10 text-base xl:text-sm text-gray-900 border-0 shadow-[0px_4px_4px_0px_rgba(0, 0, 0, 0.25);] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
                     </input>
                  </div>
               </form>
               <div className='h-32 overflow-y-auto'>
                  {renderBrands.length > 0 ? renderBrands : <Spinner></Spinner>}
               </div>
            </ul>
         </div>
         <div className='flex flex-col gap-1 pb-5'>
            <h3 className="font-400 text-[#333333b3] text-xs">Model</h3>
            <ul className="w-full xl:w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] dark:bg-gray-700 dark:border-gray-600 dark:text-white">

               <form className='pt-4'>
                  <label for="default-search" className="mb-2 text-sm font-normal text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative flex justify-center">
                     <div className="absolute inset-y-0 start-10 xl:start-6 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                     </div>
                     <input value={searchM} onChange={(event) => searchForModels(event.target.value)} type="search" id="default-search" className="block w-3/4 p-2 ps-10 text-base xl:text-sm text-gray-900 border-0 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
                     </input>
                  </div>
               </form>

               <div className='h-32 overflow-y-auto'>
                  {renderModels.length > 0 ? renderModels : <Spinner></Spinner>}
               </div>
            </ul>
         </div>
      </div>
   )
}

export default Filters

