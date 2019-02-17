<template>
  <div class="panel panel-primary">
    <div class="panel-body">
      <spinner ref="resultSpinner" v-model="resultSpinner" size="lg" fixed :text="$t('result.loading')"></spinner>
      <paginate
              :page-count="Math.ceil(result.total / itemsPerPage)"
              :click-handler="pageSelected"
              :prev-text="$t('result.paginatePrev')"
              :next-text="$t('result.paginateNext')"
              :initial-page="0"
              :ref="'paginate'"
              :container-class="'pagination'">
      </paginate>
      <div :key="index" v-for="(definition, index) in result.groups[this.currentPage]">
        <h5  class="text-info">{{definition.word}}</h5>
        <p v-html="definition.meaning"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {spinner} from 'vue-strap'
  import paginate from 'vuejs-paginate'
  export default {
    name: 'ResultItem',
    components: {
      paginate,
      spinner
    },
    props: ['result', 'word'],
    data: function () {
      return {
        itemsPerPage: 5,
        currentPage: 1,
        resultSpinner: false
      }
    },
    watch: {
      result: function (newVal) {
        if (newVal) {
          this.$refs.paginate.handlePageSelected(0)
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
