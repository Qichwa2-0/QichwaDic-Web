<template>
  <div>
    <div class="row">
      <div class="col-xs-12 text-center">
        <div id="btn-quechua" class="language-selector form-control">{{ $t('main.qichwaName') }}</div>
        <span id="lang-swapper" @click="swapLanguages">
          <icon name="exchange" scale="1.5" class="vcenter cursor-pointer"/>
        </span>
        <v-select id="select-foreign"
                  class="language-selector cursor-pointer"
                  v-model="targetLng"
                  :options="langOptions"
                  options-value="code"
                  options-label="name"
                  justified
                  close-on-select>
        </v-select>
      </div>
    </div>
    <div class="row margin-top-lg">
      <div class="col-xs-12 col-centered">
        <form v-on:submit.prevent="search">
          <div class="col-xs-12 no-padding-left no-padding-right">
            <div class="input-container input-group">
              <input class="form-control"
                     autocomplete="off"
                     v-model="searchText"
                     :placeholder="searchPlaceholder"
                     @keydown.enter="search"/>
              <v-select class="input-group-addon v-select cursor-pointer"
                        slot="inputAddon"
                        :options="searchTypes"
                        options-label="name"
                        options-value="id"
                        v-model="searchType">
              </v-select>
              <span slot="buttonAddon" class="input-group-btn">
                <button class="btn btn btn-default" type="button" @click="search">
                  <icon name="search"></icon>
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import {select} from 'vue-strap'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/search'
  import 'vue-awesome/icons/exchange'

  export default {
    name: 'search',
    components: {'v-select': select, 'icon': Icon},
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
        if (this.searchText !== undefined && this.searchText.length > 0 && this.searchText.indexOf('%') === -1) {
          this.$router.push({
            path: 'search',
            query: {
              word: this.searchText,
              fromQuechua: this.fromQuechua ? 1 : 0,
              target: this.targetLng,
              type: this.searchType
            }
          })
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

  .v-select{
    padding: 0;
    width: 30%;
    &>div.dropdown-toggle{
      border: 1px solid #e8e8e8 !important;
    }
  }

  .language-selector{
    width: 40%;
    display: inline-block;
  }

  #lang-swapper{
    margin-left: 5px;
    margin-right: 5px;
  }

  .input-group-addon{
    border: 0px;
  }
</style>
