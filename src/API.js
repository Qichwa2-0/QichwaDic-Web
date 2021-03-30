import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL
const API = {
  allDictionaries: function () {
    return axios.get(baseURL + 'dictionaries', {
      params: { all: 1 }
    })
  },
  searchDefinitions: function (searchCriteria) {
    let params = Object.assign({}, searchCriteria)
    return axios.get(baseURL + 'words', { params })
  },
  fetchEntries: function (dictionaryId, params) {
    return axios.get(baseURL + 'dictionaries/' + dictionaryId + '/words/fetch', { params })
  }
}

export default API
