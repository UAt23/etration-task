import React, { useContext } from 'react'
import ItemsContext from '../context/items';

function Product({ item }) {
   const { increaseItemAmount, decreaseItemAmount } = useContext(ItemsContext);

   const increaseAmount = (item) => {
      increaseItemAmount(item);
   };

   const decreaseAmount = (item) => {
      decreaseItemAmount(item);
   };

   return (
      <li className="w-full border-gray-200 rounded-t-lg p-2.5">
         <div className="xl:max-w-xs mx-auto flex justify-between gap-1">
            <div className='flex flex-col'>
               <label for="quantity-input" className="block text-lg xl:text-xs font-medium text-black">{item.name}</label>
               <span className='text-base xl:text-[10px] font-medium text-[#2A59FE]'>{item.price}₺</span>
            </div>
            <div className="relative flex items-center max-w-[8rem]">
               <button onClick={() => decreaseAmount(item)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-[#F3F4F6] hover:bg-gray-200  rounded-s-lg p-2 h-7 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                  </svg>
               </button>
               <p type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-[#2A59FE] border-x-0 border-gray-300 h-7 text-center text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-9 py-1" required>
               {item.amount}
               </p>
               <button onClick={() => increaseAmount(item)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-[#F3F4F6] hover:bg-gray-200 rounded-e-lg p-2 h-7 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                  </svg>
               </button>
            </div>
         </div>
      </li>
   )
}

export default Product

