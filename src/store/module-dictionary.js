import API from "../API";

export default {
    namespaced: true,
    state: {
        allDictionaries: [],
        groupedDictionaries: {}
    },
    mutations: {
        setDictionaries(state, dictionaries) {
            state.allDictionaries = dictionaries
            state.groupedDictionaries = {}
            state.allDictionaries.forEach((dictionary) => {
                if (state.groupedDictionaries[dictionary.languageBegin] !== undefined) {
                    state.groupedDictionaries[dictionary.languageBegin].push(dictionary)
                } else {
                    state.groupedDictionaries[dictionary.languageBegin] = [dictionary]
                }
            })
        }
    },
    actions: {
        fetchDictionaries(context) {
            return new Promise((resolve, reject) => {
                API.allDictionaries().then((response) => {
                    context.commit('setDictionaries', response.data)
                    resolve()
                })
            })

        }
    }
}
