import axios from 'axios';

const getAllItems = async () => {
  const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products', {
  });
  return response.data;
};

export default getAllItems;
