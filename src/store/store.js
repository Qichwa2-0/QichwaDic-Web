import Vuex from 'vuex'
import DictionaryModule from './module-dictionary'
import SearchModule from './module-search'

const buildStore = function(){
    return new Vuex.Store({
        modules: {
            dictionaryModule: DictionaryModule,
            searchModule: SearchModule
        }
    })
}

export default buildStore