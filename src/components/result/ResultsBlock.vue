<template>
  <div>
    <div class="col-12 col-md-10 mx-auto text-center mb-1">
      <spinner ref="spinner" v-model="spinner" size="lg" fixed :text="$t('result.pleaseWait')"/>
      <template v-if="showResults">
        <template v-if="results.length === 0">
          <p class="text-center text-primary mt-3">
            <strong><icon class="vcenter" name="frown-open"/></strong> {{ $t('result.noResults') }}
          </p>
        </template>
        <template v-else>
          <div class="row mt-3">
            <div class="col-12 col-md-6">
              <p class="text-center lead mr-3">{{ $t('result.resultsFor') }} <strong>{{word}}</strong></p>
              <div class="btn-group-sm <btn-group-vertical>">
                <radio v-for="(result, index) in results"
                       :key="result.dictionaryId"
                       button
                       v-model="currentResultIndex"
                       :selected-value="index"
                       type="success">
                  {{result.dictionaryName}} <span class="badge" title="total">{{result.total}}</span>
                </radio>
              </div>
            </div>
            <div class="col-12 col-md-6 mt-2">
              <result-item :result="currentResult" :word="word"/>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
  import {spinner, radio} from 'vue-strap'
  import 'vue-awesome/icons/frown-open'
  import Icon from 'vue-awesome/components/Icon'
  import ResultItem from './ResultItem.vue'
  export default{
    name: 'resultBlock',
    components: {
      spinner,
      ResultItem,
      'radio': radio,
      'icon': Icon
    },
    props: ['spinner', 'word'],
    data () {
      return {
        currentResultIndex: 0
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
        return !this.$store.state.searchModule.searchError
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
  .v-select{
    padding: 0;
  &>div.dropdown-toggle{
     border: 1px solid #e8e8e8 !important;
   }
  }
</style>
