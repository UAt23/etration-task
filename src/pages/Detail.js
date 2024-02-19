import React, { useContext } from 'react'
import ItemsContext from '../context/items'

function Detail() {
    const { selectedItem, updateCart } = useContext(ItemsContext);

    const addToCart = () => {
        updateCart(selectedItem);
    }
    return (
        <div className='grid xl:grid-cols-10 xl:gap-7 xl:col-start-1 xl:col-end-11'>
            {selectedItem
                ? <div class="row-start-1 row-end-4 xl:col-start-1 xl:col-end-11 flex flex-col flex-1 h-full xl:h-96 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                    <img class="object-cover w-96 rounded-t-lg h-full md:rounded-none md:rounded-s-lg" src={selectedItem.image} alt=""></img>
                    <div class="h-full flex flex-col justify-between p-4 leading-normal">
                        <div className='flex flex-col gap-1'>
                            <p className=" font-normal text-black text-2xl">{selectedItem.name}</p>
                            <h5 className="mb-auto text-xl font-medium text-[#2A59FE] dark:text-white">{selectedItem.price} ₺</h5>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p onClick={addToCart} className="w-full inline-flex items-center justify-center px-1 py-1 rounded-[4px] text-base font-normal text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to Cart
                            </p>
                            <p class="mb-3 h-[200px] overflow-auto font-normal text-gray-700">{selectedItem.description}</p>
                        </div>
                    </div>
                </div>
                : <div>No Data</div>
            }
        </div>
    )
}

export default Detail

