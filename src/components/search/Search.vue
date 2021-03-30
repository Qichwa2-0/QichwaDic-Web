<template>
  <div>
    <div class="row">
      <div class="col-12 text-center">
        <div id="btn-quechua" class="language-selector form-control">{{ $t('main.qichwaName') }}</div>
        <span id="lang-swapper" @click="swapLanguages">
          <icon name="exchange-alt" scale="1.5" class="vcenter cursor-pointer"/>
        </span>
        <select v-model="targetLng" class="custom-select language-selector">
          <option :key="index"
                  v-for="(targetLang, index) in langOptions"
                  :value="targetLang.code">
            {{ targetLang.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 mx-auto">
        <form v-on:submit.prevent="search">
          <div class="col-12 px-0">
            <div class="input-group">
              <input  id="input-search"
                      class="form-control"
                     autocomplete="off"
                     v-model="searchText"
                     :placeholder="searchPlaceholder"
                     @keydown.enter="search"/>
              <select id="search-type-selector" class="custom-select" v-model="searchType">
                <option :key="index"
                        v-for="(searchType, index) in searchTypes"
                        :value="searchType.id">
                  {{ searchType.name }}
                </option>
              </select>
              <div class="input-group-append">
                <button class="btn btn btn-secondary" type="submit">
                  <icon name="search"/>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/search'
  import 'vue-awesome/icons/exchange-alt'

  export default {
    name: 'search',
    components: { 'icon': Icon },
    data () {
      return {
        fromQuechua: true,
        searchType: '',
        searchText: '',
        placeholderTexts: {'es': 'Amanecer', 'en': 'House', 'fr': 'Pierre', 'de': 'Stuhl', 'it': 'Giocare'},
        targetLng: ''
      }
    },
    created () {
      this.searchType = this.$route.query.searchType || this.searchTypes[2].id
      this.targetLng = this.$route.query.target || this.langOptions[0].code
      this.searchText = this.$route.query.word || ''
    },
    computed: {
      searchPlaceholder: function () {
        if (this.fromQuechua) return 'Yawar'
        else {
          return this.placeholderTexts[this.targetLng]
        }
      },
      searchTypes: function () {
        return this.$t('searchTypes')
      },
      langOptions: function () {
        return this.$t('langOptions')
      }
    },
    methods: {
      search: function () {
        const hasQueryChanged = (newQuery) => {
          const prevQuery = this.$route.query
          return prevQuery.word !== newQuery.word
                  || prevQuery.fromQuechua !== newQuery.fromQuechua
                  || prevQuery.target !== newQuery.target
                  || prevQuery.type !== newQuery.type
        }
        if (this.searchText !== undefined && this.searchText.length > 0 && this.searchText.indexOf('%') === -1) {
          const newQuery = {
            word: this.searchText,
            fromQuechua: this.fromQuechua ? "1" : "0",
            target: this.targetLng,
            type: `${this.searchType}`
          }
          if(hasQueryChanged(newQuery)) {
            this.$router.push({
              path: 'search',
              query: newQuery
            })
          }
        }
      },
      swapLanguages: function () {
        let swapper = this.$el.querySelector('#lang-swapper')
        let prevElement = swapper.previousElementSibling
        let nextElement = swapper.nextElementSibling
        let parent = swapper.parentNode
        this.fromQuechua = !this.fromQuechua
        parent.insertBefore(nextElement, swapper)
        parent.insertBefore(prevElement, null)
      }
    }
  }
</script>
<style lang="scss" scoped>

  .language-selector{
    width: 40%;
    display: inline-block;
  }

  #lang-swapper{
    margin-left: 5px;
    margin-right: 5px;
  }

  .input-group-addon{
    border: 0;
  }
</style>
