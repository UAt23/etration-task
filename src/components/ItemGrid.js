import React, { useContext } from 'react'
import Item from './Item'
import ItemsContext from '../context/items'

function ItemGrid() {
   const { displayedData, paginate, updatePaginator, setSelected } = useContext(ItemsContext);

   const displayedItems = displayedData.map((item) => {
      return <Item key={item.id} item={item}></Item>
   });
   const paginator = createPaginator();

   function createPaginator() {
      let pages = [];
      for (let i = 1; i <= paginate.totalPages; i++) {
         if (i === paginate.currentPage) {
            pages.push(
               <li key={i}>
                  <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-2 h-6 leading-tight text-[#2A59FE] bg-white rounded-md shadow-[0px_0px_10px_0px_rgba(162,170,180,0.25)]">{i}</a>
               </li>
            )
         } else {
            pages.push(
               <li key={i} onClick={() => { onPageIndexClicked(i) }}>
                  <a href="#" className="flex items-center justify-center px-2 h-6 leading-tight text-[#00000050] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</a>
               </li>
            )
         }
      }
      return pages
   }

   const onPageIndexClicked = (index) => {
      updatePaginator(index);
   }

   const onNextPage = () => {
      updatePaginator(paginate.currentPage + 1);
   }

   const onPreviousPage = () => {
      updatePaginator(paginate.currentPage - 1);
   }


   return (
      <div className='xl:col-start-3 xl:col-end-11'>
         <div className='flex flex-1 flex-col gap-2.5'>
            {
               displayedItems.length > 0
                  ?
                  <div className='flex flex-col gap-6 xl:gap-2.5 justify-center'>
                     <div className='flex justify-start flex-wrap gap-6 h-full xl:h-[80vh] xl:overflow-auto'>
                        {displayedItems}
                     </div>
                     <nav aria-label="Pagination" className='flex justify-center'>
                        <ul className="flex items-center gap-1 -space-x-px h-6 text-lg xl:text-sm">
                           <li onClick={onPreviousPage}>
                              <a href="#" className="flex items-center justify-center px-2 h-6 ms-0 leading-tight text-[#00000050] rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                                 <span className="sr-only">Previous</span>
                                 <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                 </svg>
                              </a>
                           </li>
                           {paginator}
                           <li onClick={onNextPage}>
                              <a href="#" className="flex items-center justify-center px-2 h-6 leading-tight text-[#00000050]  rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                                 <span className="sr-only">Next</span>
                                 <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                 </svg>
                              </a>
                           </li>
                        </ul>
                     </nav>
                  </div>
                  :
                  <div className='flex justify-center text-lg text-[#2A59FE] font-semibold'>No products found</div>
            }
         </div>
      </div>

   )
}

export default ItemGrid

