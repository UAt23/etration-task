import './App.css';
import Layout from './pages/Layout';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import ItemsContext from './context/items';

function App() {
  const { fetchData } = useContext(ItemsContext) 

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='h-full bg-[#F9F9F9]'>
      <Navbar></Navbar>
      <Layout></Layout>
    </div>
  );
}

export default App;
