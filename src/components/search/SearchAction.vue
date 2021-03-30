<template>
  <ResultsBlock :word="word" :spinner="spinner"/>
</template>

<script>
import ResultsBlock from '../result/ResultsBlock'
export default {
  name: 'SearchAction',
  props: ['word', 'fromQuechua', 'type', 'target'],
  components: { ResultsBlock: ResultsBlock },
  data () {
    return { results: [], showResults: false, spinner: false }
  },
  created () {
    this.searchDefinitions()
  },
  watch: {
    // called if route changes -> params change
    '$route' (to, from) {
      this.searchDefinitions()
    }
  },
  methods: {
    searchDefinitions () {
      this.spinner = true
      let params = { searchWord: this.word, fromQuechua: this.fromQuechua, target: this.target, searchType: this.type }
      this.$store.dispatch('searchModule/searchDefinitions', params).then(() => this.spinner = false)
    }
  }
}
</script>
