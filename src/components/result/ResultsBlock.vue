<template>
    <div class="col-12 col-md-10 mx-auto text-center mb-1">
      <Spinner :visible="spinner" :message="$t('result.pleaseWait')"/>
      <template v-if="showResults">
        <template v-if="results.length === 0">
          <p class="text-center text-primary mt-3">
            <strong><icon class="vcenter" name="frown-open" color="darkgray"/></strong> {{ $t('result.noResults') }}
          </p>
        </template>
        <template v-else>
          <div class="row mt-3">
            <div class="col-12 col-md-6 mx-auto">
              <p class="text-center lead mr-3">{{ $t('result.resultsFor') }} <strong>"{{word}}"</strong></p>
              <div class="btn-group-sm btn-group-vertical">
                <button v-for="(result, index) in results"
                        :key="index"
                        class="btn btn-block btn-success"
                        :class="{ 'active': index === currentResultIndex }"
                        @click="selectResults(index)">
                  {{result.dictionaryName}} <span class="badge badge-pill badge-light text-success float-right" title="total">{{result.total}}</span>
                </button>
              </div>
            </div>
            <div class="col-12 col-md-6 mt-2 mx-auto">
              <result-item :result="currentResult" :word="word"/>
            </div>
          </div>
        </template>
      </template>
    </div>
</template>
<script>
  import 'vue-awesome/icons/frown-open'
  import Spinner from "../common/Spinner"
  import Icon from 'vue-awesome/components/Icon'
  import ResultItem from './ResultItem.vue'
  export default{
    name: 'resultBlock',
    components: {
      Spinner,
      ResultItem,
      'icon': Icon
    },
    props: ['spinner', 'word'],
    data () {
      return {
        currentResultIndex: 1
      }
    },
    computed: {
      results() {
        return this.$store.state.searchModule.results
      },
      currentResult () {
        return this.results[this.currentResultIndex]
      },
      showResults() {
        return !this.$store.state.searchModule.searchError && !this.spinner
      }
    },
    methods: {
      selectResults(index) {
        this.currentResultIndex = index
      }
    },
    watch: {
      results: function (newVal) {
        this.currentResultIndex = 0
      }
    }
  }
</script>
<style lang="scss" scoped>
  .badge {
    font-size: 90%;
  }
</style>
