import API from "../API";

export default {
    namespaced: true,
    state: {
        searchError: false,
        results: []
    },
    getters: {
        hasResults(state) {
            return !state.searchError && state.results.length > 0
        }
    },
    mutations: {
        setSearchError(state, searchError) {
            state.searchError = searchError
        },
        setResults: function (state, results) {
            const RESULTS_PER_PAGE = 5
            state.results = results.map(function (e) {
                e.groups = {}
                e.currentPage = 1
                for (let i = 0; i < e.definitions.length; i += RESULTS_PER_PAGE) {
                    e.groups[(i / RESULTS_PER_PAGE) + 1] = e.definitions.slice(i, i + RESULTS_PER_PAGE)
                }
                return e
            })
        }
    },
    actions: {
        searchDefinitions (context, params) {
            context.commit('setSearchError', false)
            return new Promise((resolve, reject) => {
                API.searchDefinitions(params).then((response) =>{
                    context.commit('setResults', response.data)
                    resolve()
                }, (error) => context.commit('setSearchError', true))
            })

        },
        fetchEntries(context, params) {
            context.commit('setSearchError', false)
            return new Promise((resolve, reject) => {
                API.fetchEntries(params.dictionaryId, params.fetchParams).then(function (response) {
                    params.callback(response.data.definitions)
                    resolve()
                }, (error) => context.commit('setSearchError', true))
            })
        }
    }
}
