import { createContext, useEffect, useState } from "react";
import getAllItems from "../api";
import SORTTYPE from "../constants/sort";

const ItemsContext = createContext();

function Provider({ children }) {
   const [appData, setAppData] = useState([]);
   const [displayedData, setDisplayedData] = useState([]);
   // ITEM STATE
   const [selectedItem, setSelectedItem] = useState();
   // FILTER STATES
   const [queryText, setQueryText] = useState('');
   const [sort, setSort] = useState(SORTTYPE.oldNew);
   const [brands, setBrands] = useState([]);
   const [models, setModels] = useState([]);
   // CHECKOUT STATES
   const [cart, setCart] = useState([]);
   const [total, setTotal] = useState(0);
   // PAGINATION STATES
   const [paginate, setPaginate] = useState({
      currentPage: 1,
      totalPages: 0,
   });
   // PAGE LOADING STATE
   const [pageLoading, setPageLoading] = useState(true);
   const [initialDataRetrieved, setInitialDataRetrieved] = useState(false);

   useEffect(() => {
      const savedTotal = JSON.parse(localStorage.getItem('total'));
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      savedTotal && setTotal(savedTotal);
      savedCart && setCart([...savedCart]);
      setInitialDataRetrieved(true);
   }, []);

   useEffect(() => {
      if (initialDataRetrieved) {
         localStorage.setItem('total', JSON.stringify(total));
         localStorage.setItem('cart', JSON.stringify(cart));
      }
   }, [total, cart]);

   useEffect(() => {
      filterDisplayedData();
   }, [queryText, brands, models, sort]);



   async function fetchData() {
      const res = await getAllItems().finally(() => setPageLoading(false));
      setAppData(res);
      paginateData(res);
      createFilterData(res);
   }

   // Selected Item ----------------------------------------------------------------

   function setSelected(item) {
      setSelectedItem(item);
   }

   // PAGINATOR ----------------------------------------------------------------

   function paginateData(items, page = 1, perPage = 12) {
      if (items) {
         const paginatedData = items.slice(perPage * (page - 1), perPage * page);
         const totalPages = Math.ceil(items.length / perPage);
         setPaginate({
            currentPage: page,
            totalPages
         });
         setDisplayedData(paginatedData);
      }
   }

   function updatePaginator(newPage) {
      if (newPage >= 1 && newPage <= paginate.totalPages) {
         paginateData(appData, newPage);
         setPaginate(
            {
               currentPage: newPage,
               totalPages: paginate.totalPages
            }
         )
      }
   }

   // Search ----------------------------------------------------------------

   function setQuery(query) {
      setQueryText(query);
   }

   // Filters ----------------------------------------------------------------

   function createFilterData(data) {
      let models
      let brands
      if (data) {
         models = [...new Set(data.map(item => {
            return item.model
         }))].map(item => {
            return {
               label: item,
               checked: false,
               displayed: true
            }
         })
         brands = [...new Set(data.map(item => {
            return item.brand
         }))].map(item => {
            return {
               label: item,
               checked: false,
               displayed: true
            }
         })
         setModels(models);
         setBrands(brands);
      }
   }
   function updateSelectedModels(change) {
      const updatedModels = models.map((model) => {
         if (model.label === Object.keys(change)[0]) {
            return { ...model, checked: Object.values(change)[0] };
         }
         return model;
      })
      setModels(updatedModels);
   }
   function updateSelectedBrands(change) {
      const updatedBrands = brands.map((brand) => {
         if (brand.label === Object.keys(change)[0]) {
            return { ...brand, checked: Object.values(change)[0] };
         }
         return brand;
      })
      setBrands(updatedBrands);
   }

   function filterDisplayedData() {
      let filteredData = [...appData]

      filteredData = sortProducts(filteredData);

      if (queryText) {
         filteredData = filteredData.filter(
            (element) => element.name.toLowerCase().includes(queryText.toLowerCase())
         );
      }
      const selectedBrands = brands.filter((brand) => brand.checked).map((brand) => brand.label);
      if (selectedBrands.length > 0) {
         filteredData = filteredData.filter((item) => selectedBrands.includes(item.brand));
      };

      const selectedModels = models.filter((model) => model.checked).map((model) => model.label);
      if (selectedModels.length > 0) {
         filteredData = filteredData.filter((item) => selectedModels.includes(item.model));
      };
      paginateData(filteredData);
   }

   function setSortContext(sortType) {
      setSort(sortType)
   }

   function sortProducts(data) {
      let sortedData;
      switch (sort) {
         case SORTTYPE.newOld:
            sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
         case SORTTYPE.lowHigh:
            sortedData = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
         case SORTTYPE.highLow:
            sortedData = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
         default:
            sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
      return sortedData;
   }

   function searchBrands(txt) {
      console.log(txt);
      const updated = brands.map(brand => {
         console.log(brand);
         if (brand.label.toLowerCase().includes(txt.toLowerCase())) {
            return {...brand, displayed: true};
         } else {
            return {...brand, displayed: false};
         }
      })
      setBrands(updated);
   }
   function searchModels(txt) {
      const updated = models.map(model => {
         if (model.label.toLowerCase().includes(txt.toLowerCase())) {
            return {...model, displayed: true};
         } else {
            return {...model, displayed: false};
         }
      })
      setModels(updated);
   }

   // Cart --------------------------------

   function updateCart(item) {
      const newItem = {
         id: item.id,
         name: item.name,
         price: item.price,
         amount: 1
      }
      const existingItem = cart && cart.find(element => element.id === item.id);
      if (existingItem) {
         increaseItemAmount(existingItem)
      } else {
         updateTotal(item, 1);
         setCart([...cart, newItem]);
      }
   }

   function increaseItemAmount(item) {
      const existingItem = cart && cart.find(element => element.id === item.id);
      if (existingItem) {
         existingItem.amount++;
         updateTotal(item, 1);
      }
      setCart([...cart]);
   }

   function decreaseItemAmount(item) {
      const existingItem = cart && cart.find(element => element.id === item.id);
      if (existingItem) {
         if (existingItem.amount === 1) {
            const newArray = (cart.filter(element => element.id !== existingItem.id))
            setCart([...newArray]);
         } else {
            existingItem.amount--;
            setCart([...cart]);
         }
         updateTotal(item, 0);
      }
   }

   function updateTotal(item, type) {
      if (type) {
         setTotal(total + Number(item.price));
      } else {
         setTotal(total - Number(item.price));
      }
   }

   const appContext = {
      displayedData,
      fetchData,
      selectedItem,
      setSelected,
      paginate,
      updatePaginator,
      setQuery,
      setSortContext,
      models,
      updateSelectedModels,
      searchModels,
      brands,
      updateSelectedBrands,
      searchBrands,
      cart,
      updateCart,
      increaseItemAmount,
      decreaseItemAmount,
      total,
      pageLoading
   }

   return (
      <ItemsContext.Provider value={appContext}>
         {children}
      </ItemsContext.Provider>
   )
}
export { Provider };
export default ItemsContext;