import React, { useContext } from 'react'
import ItemsContext from '../context/items'
import Product from './Product';

function Checkout() {
   const { cart, total } = useContext(ItemsContext);

   const renderedCartItems = cart.map((item) => {
      return (
         <Product key={item.id} item={item}></Product>
      )
   });

   const noContent = (
      <div className='m-auto text-xs font-medium text-black'>There is nothing in your cart.</div>
   )

   return (
      <div className='h-[28rem]'>
         <div className='flex flex-col gap-1 xl:h-48 mb-6'>
            <h3 className="font-400 text-[#333333b3] text-xs">Cart</h3>
            <ul className="w-full xl:w-56 h-48 overflow-auto flex flex-col text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
               {renderedCartItems.length ? renderedCartItems : noContent}
            </ul>
         </div>
         <div className='flex flex-col gap-1 h-auto w-full xl:w-56 p-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
            <h3 className="font-400 text-[#000] text-sm">Total Price: <span className='font-bold text-[#2A59FE] text-sm'>{total}₺</span></h3>
            <a href="#" className="w-full inline-flex items-center justify-center px-1 py-1 rounded-[4px] text-sm font-normal text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               Checkout
            </a>
         </div>
      </div>
   )
}

Checkout.propTypes = {

}

export default Checkout

