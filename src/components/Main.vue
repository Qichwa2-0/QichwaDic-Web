<template>
  <div class="container-fluid body-fixed-footer">
    <div class="row" :class="[this.hasResults ? 'margin-top-sm' : 'margin-top-md']">
      <div>
        <v-select id="select-language"
                  class="language-selector cursor-pointer pull-right margin-right-sm"
                  v-model="$i18n.locale"
                  :options="languages"
                  options-value="code"
                  options-label="name"
                  justified close-on-select
                  @change="changeLocale">
        </v-select>
      </div>
      <section id="logo-header"
               class="col-xs-12 col-sm-10 col-sm-offset-1"
               :class="[this.hasResults ? 'margin-top-sm' : 'margin-top-md']">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1" >
          <router-link to="/">
            <img class="img-responsive center-block"
                 :class="[this.hasResults ? 'logo-small' : 'logo']"
                 src="/img/qichwa20-logo.png"
                 alt="Qichwa 2.0">
          </router-link>
          <p class="text-center" :class="[this.hasResults ? 'h4 ' : 'h2 margin-top-xl']">
            <span class="text-info">{{ $t("main.title") }}</span>
          </p>
        </div>
      </section>
    </div>
    <div class="row">
      <router-link to="/dictionaries"
                   tag="button"
                   class="btn btn-default center-block margin-top-xl">
        {{ $t("main.seeDictionaries") }}
      </router-link>
    </div>
    <div class="row">
      <section id="search"
               class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3"
               :class="[this.hasResults ? 'search-section-small-margin' : 'search-section']">
        <Search></Search>
      </section>
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Search from './search/Search'
import 'vue-awesome/icons/book'
import { select } from 'vue-strap'

export default {
  name: 'SearchBlock',
  components: { Search, 'v-select': select },
  data: function () {
    return {
      languages: [
        {code: 'es', name: 'Español'},
        {code: 'qus', name: 'Urin qichwa'},
        {code: 'en', name: 'English'},
        {code: 'fr', name: 'Français'},
        {code: 'de', name: 'Deutsch', selected: false},
        {code: 'it', name: 'Italiano'},
        {code: 'cs', name: 'Čeština'}
      ],
      fromQuechua: false,
      spinner: false,
      showResults: false,
      showDictionaries: false,
      totalResults: 0
    }
  },
  created () {
    let savedLang = localStorage.getItem('qichwadic.lang')
    if (savedLang) {
      this.$i18n.locale = savedLang
    }
    this.emptyResults()
  },
  methods: {
    changeLocale (value) {
      let savedLang = localStorage.getItem('qichwadic.lang')
      if (savedLang && savedLang !== value) {
        localStorage.setItem('qichwadic.lang', value)
      }
    },
    emptyResults() {
      this.$store.commit('searchModule/setResults', [])
    }
  },
  computed: {
    hasResults () {
      return this.$store.getters["searchModule/hasResults"]
    }
  }, beforeRouteUpdate (to, from, next) {
    this.emptyResults()
    next()
  }
}
</script>
<style lang="scss" scoped>

.search-section{
  margin-top: 4rem;
}

.search-section-small-margin{
  margin-top: 1rem;
}

#select-language{
  width: 150px;
}
</style>
