<template>
    <div class="card bg-white">
        <div class="card-body">
            <Spinner :visible="resultSpinner" :message="$t('result.loading')" />
            <b-pagination
                    v-model="currentPage"
                    :total-rows="resultsLength"
                    :per-page="itemsPerPage"
                    aria-controls="my-table"
                    align="center"
                    first-number
                    last-number
                    @input="pageSelected">
                <template v-slot:prev-text>
                    <icon name="arrow-left" scale="0.8"/>
                </template>
                <template v-slot:next-text>
                    <icon name="arrow-right" scale="0.8"/>
                </template>
            </b-pagination>
            <div :key="index" v-for="(definition, index) in result.groups[this.currentPage]">
                <h5  class="text-info">{{definition.word}}</h5>
                <p v-html="definition.meaning"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "../common/Spinner"
    import Icon from 'vue-awesome'
    import 'vue-awesome/icons/arrow-left'
    import 'vue-awesome/icons/arrow-right'
    // import paginate from 'vuejs-paginate'
    export default {
        name: 'ResultItem',
        components: {
            // paginate,
            Spinner,
            Icon
        },
        props: ['result', 'word'],
        data: function () {
            return {
                itemsPerPage: 5,
                currentPage: 1,
                resultSpinner: false
            }
        },
        computed: {
            resultsLength() {
                return this.result.total
            }
        },
        watch: {
            result: function (newVal) {
                if (newVal) {
                    this.currentPage = 1;
                }
            }
        },
        methods: {
            pageSelected: function(pageSelected) {
                this.currentPage = pageSelected
                let dataToShow = this.result.groups[pageSelected]
                if (!dataToShow || dataToShow.length === 0) {
                    this.fetchResults(this.currentPage )
                }
            },
            fetchResults(pageSelected) {
                let _this = this
                let newEntriesRequest = _this.computeNewEntriesPage(pageSelected)
                _this.resultSpinner = true
                let params = {
                    dictionaryId: this.result.dictionaryId,
                    fetchParams: {
                        searchWord: this.word,
                        fromQuechua: this.$route.query.origen === 'qu',
                        searchType: this.$route.query.type,
                        page: newEntriesRequest.pageToRequest
                    },
                    callback: function (definitions) {
                        _this.updateCurrentEntries(definitions, newEntriesRequest.nextGroupIndex)
                    }
                }
                this.$store.dispatch('searchModule/fetchEntries', params).then(() => _this.resultSpinner = false)
            },
            updateCurrentEntries(definitions, nextGroupIndex) {
                for (let i = 0; i < definitions.length; i += this.itemsPerPage) {
                    this.$set(this.result.groups, (i / this.itemsPerPage) + nextGroupIndex, definitions.slice(i, i + 5))
                }
            },
            computeNewEntriesPage(selectedPage) {
                const TOTAL_RESULTS_PER_PAGINATION = 20
                const PAGES_PER_REQUEST = TOTAL_RESULTS_PER_PAGINATION / this.itemsPerPage
                let pageIndex = selectedPage - 1
                let pageToRequest = parseInt(pageIndex / PAGES_PER_REQUEST) + 1
                return { pageToRequest: pageToRequest, nextGroupIndex: (pageToRequest - 1) * PAGES_PER_REQUEST + 1 }
            }
        }
    }
</script>

<style>

</style>
