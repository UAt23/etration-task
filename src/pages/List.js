import React, { useContext } from 'react'
import Filters from '../components/Filters'
import ItemGrid from '../components/ItemGrid'
import ItemsContext from '../context/items'
import Spinner from '../components/Spinner';

function List() {
   const { pageLoading } = useContext(ItemsContext);

   return (
      <div className='grid xl:grid-cols-10 xl:gap-7 xl:col-start-1 xl:col-end-11'>
         <Filters></Filters>
         {
            pageLoading
               ? <Spinner></Spinner>
               : <ItemGrid></ItemGrid>
         }
      </div>
   )
}

export default List

