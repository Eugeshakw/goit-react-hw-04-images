import axios from 'axios';

export  async function getPhotosByQuery(qery, page) {
    const API_KEY ='37175835-76686085e99d052827f14fa60'
    const BASE_URL = 'https://pixabay.com/api/'
    const {data} = await axios.get(`${BASE_URL}?q=${qery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&`)
    return data
}

