import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detail from '../pages/Detail'
import Checkout from '../components/Checkout'
import List from './List';

function Layout(props) {
   return (
      <div className='overflow-y-scroll h-screen px-10 pt-10 bg-[#F9F9F9] grid grid-cols-1 gap-1 mx-auto xl:grid-cols-12 xl:gap-7 xl:mx-auto'>
         <Router>
            <Routes>
               <Route exact path="/" element={<List />} />
               <Route
                  path="/detail"
                  element={<Detail />}
               />
            </Routes>
         </Router>
         <Checkout></Checkout>
      </div>
   )
}

Layout.propTypes = {

}

export default Layout

