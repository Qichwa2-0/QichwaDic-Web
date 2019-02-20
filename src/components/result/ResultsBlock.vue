<template>
  <div>
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 text-center margin-bottom-sm">
      <spinner ref="spinner" v-model="spinner" size="lg" fixed :text="$t('result.pleaseWait')"></spinner>
      <template v-if="showResults">
        <template v-if="results.length === 0">
          <p class="text-center text-default margin-top-xxl">
            <strong><icon class="vcenter" name="frown-o"></icon></strong> {{ $t('result.noResults') }}
          </p>
        </template>
        <template v-else>
          <div class="row margin-top-xxl">
            <div class="col-xs-12 col-sm-6">
              <p class="text-center lead margin-right-xl">{{ $t('result.resultsFor') }} <strong>{{word}}</strong></p>
              <div class="btn-group-sm btn-group-vertical">
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
            <div class="col-xs-12 col-sm-6 margin-top-md">
              <result-item :result="currentResult" :word="word"></result-item>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
  import {spinner, radio} from 'vue-strap'
  import 'vue-awesome/icons/frown-o'
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
        return this.$store.getters['searchModule/hasResults']
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
    padding: 0px;
  &>div.dropdown-toggle{
     border: 1px solid #e8e8e8 !important;
   }
  }
</style>
