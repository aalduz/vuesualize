import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vuesualize-5ec29.firebaseio.com'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance