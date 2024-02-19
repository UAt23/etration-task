import React, { useContext } from 'react';
import ItemsContext from '../context/items';
import { useNavigate } from "react-router-dom";

function Item({ item }) {
   const { updateCart, setSelected } = useContext(ItemsContext);
   const navigate = useNavigate();

   const selectItem = (item) => {
      setSelected(item);
      navigate('/detail')
   };

   const addToCart = (event) => {
      event.stopPropagation()
      updateCart(item);
   }

   return (
      <div onClick={() => selectItem(item)} href='/detail' className="flex flex-col w-full h-[28rem] sm:w-80 md:w-[20.6rem] md:h-[32rem] lg:w-[28.6rem] xl:w-48 xl:h-[22rem] bg-white border border-gray-200 shadow cursor-pointer">
         <div className="flex h-52 sm:h-56 sm:object-fill xl:h-40 m-2.5 bg-[#C4C4C4]" href='#'>
            <img alt="books" src={item.image} />
         </div>
         <div className="flex flex-1 flex-col justify-between p-2.5">
            <div className='flex flex-col '>
               <div>
                  <h5 className="mb-2 text-base xl:text-sm font-medium text-[#2A59FE]">{item.price} ₺</h5>
               </div>
               <p className="mb-3 font-medium text-black text-base xl:text-sm">{item.name}</p>
               <p className="mb-1 font-medium text-black text-sm xl:text-xs">{item.brand}</p>
               <p className="mb-1 font-medium text-black text-sm xl:text-xs">{item.model}</p>
            </div>
            <p onClick={(event) => addToCart(event)} className="w-full inline-flex items-center justify-center px-1 py-1 rounded-[4px] text-base font-normal text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               Add to Cart
            </p>
         </div>
      </div>
   )
}

export default Item