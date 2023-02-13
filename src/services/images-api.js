import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'
const KEY = '32346607-2f4a4184af58487b859814685'
const PER_PAGE = 12

export const getData = async (searchQuery, page = 1) => {
    const options = {
        params: {
          q: searchQuery,
          page: page,
          per_page: PER_PAGE,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          key: KEY,
        },
      };

    const response = await axios.get(`${BASE_URL}`, options)    
    const {data} = response


    return data
}