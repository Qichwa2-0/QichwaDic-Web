import API from "../API";

export default {
    namespaced: true,
    state: {
        allDictionaries: [],
        groupedDictionaries: {}
    },
    mutations: {
        setDictionaries(state, dictionaries) {
            const dictionariesWithCompilators = function(dictionaries) {
                var getCompilator = function (author) {
                    const AUTHOR_TAYLOR = 'Gerald Taylor'
                    const AUTHOR_RUNASIMI_DE = 'Philip Jacobs - runasimi.de'
                    if (AUTHOR_TAYLOR === author) return { name: 'Qichwa 2.0', url: 'https://www.qichwa.net' }
                    if (AUTHOR_RUNASIMI_DE === author) return { name: AUTHOR_RUNASIMI_DE, url: 'http://runasimi.de' }
                    else return { name: 'Asociación ILLA-A', url: '#' } // ILLA's website is not working
                }
                return dictionaries.map(function (dictionary) {
                    dictionary['compilator'] = getCompilator(dictionary.author)
                    return dictionary
                })
            }
            state.allDictionaries = dictionariesWithCompilators(dictionaries)
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
